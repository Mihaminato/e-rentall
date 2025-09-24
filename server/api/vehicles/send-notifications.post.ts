import { sendEmail } from '~/server/utils/email'

interface VehiclePayload {
  id: string
  make: string
  model: string
  license_plate?: string | null
  province?: string | null
  description?: string | null
  year?: number | null
  vehicle_type?: string | null
  transmission?: string | null
  fuel_type?: string | null
  seats?: number | null
  consumption?: number | null
  price_per_day?: number | null
}

interface OwnerPayload {
  first_name?: string | null
  last_name?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
}

interface VehicleEmailData {
  eventType: 'vehicle_created' | 'vehicle_updated_active' | 'vehicle_updated'
  vehicle: VehiclePayload
  owner: OwnerPayload
  modifiedFields?: string[]
}

// eslint-disable-next-line max-lines-per-function, complexity
export default defineEventHandler(async event => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const appUrl = getRequestURL(event).origin

  try {
    const body = (await readBody(event)) as VehicleEmailData
    const { eventType, vehicle, owner, modifiedFields = [] } = body

    const emailsToSend: {
      to?: string
      subject: string
      component: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props: Record<string, any>
    }[] = []

    const commonProps = {
      vehicleId: vehicle.id,
      vehicleName: vehicle.make,
      vehicleModel: vehicle.model,
      vehicleLicensePlate: vehicle.license_plate || 'Non renseignée',
      province: vehicle.province || 'Non renseignée',
      description: vehicle.description || '',
      year: vehicle.year,
      vehicleType: vehicle.vehicle_type,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuel_type,
      seats: vehicle.seats,
      consumption: vehicle.consumption,
      pricePerDay: vehicle.price_per_day,
      ownerName: `${owner.first_name || ''} ${owner.last_name || ''}`.trim() || '—',
      ownerEmail: owner.email || '—',
      ownerPhone: owner.phone || '—',
      ownerAddress: owner.address || '—',
      appUrl
    }

    switch (eventType) {
      case 'vehicle_created':
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ADMIN] Nouveau véhicule actif - ${vehicle.make} ${vehicle.model}`,
          component: 'VehicleActivated',
          props: commonProps
        })
        break
      case 'vehicle_updated_active':
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ADMIN] Véhicule actif mis à jour - #${vehicle.id.slice(0, 8)}`,
          component: 'VehicleUpdatedActive',
          props: commonProps
        })
        break
      case 'vehicle_updated':
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ADMIN] Véhicule modifié - ${vehicle.make} ${vehicle.model} #${vehicle.id.slice(0, 8)}`,
          component: 'VehicleUpdated',
          props: {
            ...commonProps,
            modifiedFields
          }
        })
        break
      default:
        throw createError({ statusCode: 400, statusMessage: "Type d'événement non supporté" })
    }

    const results = await Promise.allSettled(
      emailsToSend
        .filter(email => email.to)
        .map(email =>
          sendEmail({
            to: email.to || '',
            subject: email.subject,
            component: email.component,
            props: email.props
          })
        )
    )

    const rejected = results.filter(r => r.status === 'rejected')
    return {
      success: rejected.length === 0,
      emailsSent: results.length - rejected.length,
      emailsFailed: rejected.length
    }
  } catch (error) {
    console.error('Erreur vehicles/send-notifications:', error)
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi des emails véhicules"
    })
  }
})
