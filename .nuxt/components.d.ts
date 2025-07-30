
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'NavAuthMenu': typeof import("../components/NavAuthMenu.vue")['default']
    'NavFooter': typeof import("../components/NavFooter.vue")['default']
    'NavHeader': typeof import("../components/NavHeader.vue")['default']
    'AdminBookingsFilters': typeof import("../components/admin/BookingsFilters.vue")['default']
    'AdminBookingsTable': typeof import("../components/admin/BookingsTable.vue")['default']
    'AdminDrawer': typeof import("../components/admin/Drawer.vue")['default']
    'AdminNavbar': typeof import("../components/admin/Navbar.vue")['default']
    'AdminNavigation': typeof import("../components/admin/Navigation.vue")['default']
    'AdminProfile': typeof import("../components/admin/Profile.vue")['default']
    'AdminRecentBookings': typeof import("../components/admin/RecentBookings.vue")['default']
    'AdminRecentVehicles': typeof import("../components/admin/RecentVehicles.vue")['default']
    'AdminSidebar': typeof import("../components/admin/Sidebar.vue")['default']
    'AdminStatCards': typeof import("../components/admin/StatCards.vue")['default']
    'AdminUserMenu': typeof import("../components/admin/UserMenu.vue")['default']
    'AdminUsersFilters': typeof import("../components/admin/UsersFilters.vue")['default']
    'AdminUsersTable': typeof import("../components/admin/UsersTable.vue")['default']
    'AdminUsersToVerify': typeof import("../components/admin/UsersToVerify.vue")['default']
    'AdminVehicleDetailsModal': typeof import("../components/admin/VehicleDetailsModal.vue")['default']
    'AdminVehiclesFilters': typeof import("../components/admin/VehiclesFilters.vue")['default']
    'AdminVehiclesTable': typeof import("../components/admin/VehiclesTable.vue")['default']
    'BookingsBookingDetailsGrid': typeof import("../components/bookings/BookingDetailsGrid.vue")['default']
    'BookingsRenterRequestDetails': typeof import("../components/bookings/RenterRequestDetails.vue")['default']
    'BookingsRequestCard': typeof import("../components/bookings/RequestCard.vue")['default']
    'IconsDefaultAvatar': typeof import("../components/icons/DefaultAvatar.vue")['default']
    'MessagesChatMessages': typeof import("../components/messages/ChatMessages.vue")['default']
    'MessagesConversationsList': typeof import("../components/messages/ConversationsList.vue")['default']
    'MessagesInput': typeof import("../components/messages/Input.vue")['default']
    'ProfileCard': typeof import("../components/profile/Card.vue")['default']
    'ProfileDocumentUploadModal': typeof import("../components/profile/DocumentUploadModal.vue")['default']
    'ProfileDocuments': typeof import("../components/profile/Documents.vue")['default']
    'ProfileForm': typeof import("../components/profile/Form.vue")['default']
    'ProfileUserCard': typeof import("../components/profile/UserCard.vue")['default']
    'UiCalendar': typeof import("../components/ui/Calendar.vue")['default']
    'UiConfirmationModal': typeof import("../components/ui/ConfirmationModal.vue")['default']
    'UiFormField': typeof import("../components/ui/FormField.vue")['default']
    'UiFormInput': typeof import("../components/ui/FormInput.vue")['default']
    'UiFormSelect': typeof import("../components/ui/FormSelect.vue")['default']
    'UiImageDropzone': typeof import("../components/ui/ImageDropzone.vue")['default']
    'UiImageModal': typeof import("../components/ui/ImageModal.vue")['default']
    'UiPagination': typeof import("../components/ui/Pagination.vue")['default']
    'UiProfileVerificationCard': typeof import("../components/ui/ProfileVerificationCard.vue")['default']
    'UiSessionTroubleshoot': typeof import("../components/ui/SessionTroubleshoot.vue")['default']
    'UiToast': typeof import("../components/ui/Toast.vue")['default']
    'UiUserAvatar': typeof import("../components/ui/UserAvatar.vue")['default']
    'VehiclesAvailabilityModal': typeof import("../components/vehicles/AvailabilityModal.vue")['default']
    'VehiclesBookingModal': typeof import("../components/vehicles/BookingModal.vue")['default']
    'VehiclesFiltersSearch': typeof import("../components/vehicles/FiltersSearch.vue")['default']
    'VehiclesFormModal': typeof import("../components/vehicles/FormModal.vue")['default']
    'VehiclesPhotoCarousel': typeof import("../components/vehicles/PhotoCarousel.vue")['default']
    'VehiclesPhotoPreview': typeof import("../components/vehicles/PhotoPreview.vue")['default']
    'VehiclesVehicleAvailabilityCalendar': typeof import("../components/vehicles/VehicleAvailabilityCalendar.vue")['default']
    'VehiclesVehicleCard': typeof import("../components/vehicles/VehicleCard.vue")['default']
    'VehiclesVehicleGallery': typeof import("../components/vehicles/VehicleGallery.vue")['default']
    'VehiclesVehicleOwnerInfo': typeof import("../components/vehicles/VehicleOwnerInfo.vue")['default']
    'VehiclesVehicleOwnerStats': typeof import("../components/vehicles/VehicleOwnerStats.vue")['default']
    'VehiclesVehicleSpecs': typeof import("../components/vehicles/VehicleSpecs.vue")['default']
    'ScriptAriaLoadingIndicator': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptAriaLoadingIndicator.vue")['default']
    'ScriptCarbonAds': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCarbonAds.vue")['default']
    'ScriptCrisp': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCrisp.vue")['default']
    'ScriptGoogleAdsense': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleAdsense.vue")['default']
    'ScriptGoogleMaps': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleMaps.vue")['default']
    'ScriptIntercom': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptIntercom.vue")['default']
    'ScriptLemonSqueezy': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLemonSqueezy.vue")['default']
    'ScriptLoadingIndicator': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLoadingIndicator.vue")['default']
    'ScriptStripePricingTable': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptStripePricingTable.vue")['default']
    'ScriptVimeoPlayer': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptVimeoPlayer.vue")['default']
    'ScriptYouTubePlayer': typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptYouTubePlayer.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'Icon': typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyNavAuthMenu': LazyComponent<typeof import("../components/NavAuthMenu.vue")['default']>
    'LazyNavFooter': LazyComponent<typeof import("../components/NavFooter.vue")['default']>
    'LazyNavHeader': LazyComponent<typeof import("../components/NavHeader.vue")['default']>
    'LazyAdminBookingsFilters': LazyComponent<typeof import("../components/admin/BookingsFilters.vue")['default']>
    'LazyAdminBookingsTable': LazyComponent<typeof import("../components/admin/BookingsTable.vue")['default']>
    'LazyAdminDrawer': LazyComponent<typeof import("../components/admin/Drawer.vue")['default']>
    'LazyAdminNavbar': LazyComponent<typeof import("../components/admin/Navbar.vue")['default']>
    'LazyAdminNavigation': LazyComponent<typeof import("../components/admin/Navigation.vue")['default']>
    'LazyAdminProfile': LazyComponent<typeof import("../components/admin/Profile.vue")['default']>
    'LazyAdminRecentBookings': LazyComponent<typeof import("../components/admin/RecentBookings.vue")['default']>
    'LazyAdminRecentVehicles': LazyComponent<typeof import("../components/admin/RecentVehicles.vue")['default']>
    'LazyAdminSidebar': LazyComponent<typeof import("../components/admin/Sidebar.vue")['default']>
    'LazyAdminStatCards': LazyComponent<typeof import("../components/admin/StatCards.vue")['default']>
    'LazyAdminUserMenu': LazyComponent<typeof import("../components/admin/UserMenu.vue")['default']>
    'LazyAdminUsersFilters': LazyComponent<typeof import("../components/admin/UsersFilters.vue")['default']>
    'LazyAdminUsersTable': LazyComponent<typeof import("../components/admin/UsersTable.vue")['default']>
    'LazyAdminUsersToVerify': LazyComponent<typeof import("../components/admin/UsersToVerify.vue")['default']>
    'LazyAdminVehicleDetailsModal': LazyComponent<typeof import("../components/admin/VehicleDetailsModal.vue")['default']>
    'LazyAdminVehiclesFilters': LazyComponent<typeof import("../components/admin/VehiclesFilters.vue")['default']>
    'LazyAdminVehiclesTable': LazyComponent<typeof import("../components/admin/VehiclesTable.vue")['default']>
    'LazyBookingsBookingDetailsGrid': LazyComponent<typeof import("../components/bookings/BookingDetailsGrid.vue")['default']>
    'LazyBookingsRenterRequestDetails': LazyComponent<typeof import("../components/bookings/RenterRequestDetails.vue")['default']>
    'LazyBookingsRequestCard': LazyComponent<typeof import("../components/bookings/RequestCard.vue")['default']>
    'LazyIconsDefaultAvatar': LazyComponent<typeof import("../components/icons/DefaultAvatar.vue")['default']>
    'LazyMessagesChatMessages': LazyComponent<typeof import("../components/messages/ChatMessages.vue")['default']>
    'LazyMessagesConversationsList': LazyComponent<typeof import("../components/messages/ConversationsList.vue")['default']>
    'LazyMessagesInput': LazyComponent<typeof import("../components/messages/Input.vue")['default']>
    'LazyProfileCard': LazyComponent<typeof import("../components/profile/Card.vue")['default']>
    'LazyProfileDocumentUploadModal': LazyComponent<typeof import("../components/profile/DocumentUploadModal.vue")['default']>
    'LazyProfileDocuments': LazyComponent<typeof import("../components/profile/Documents.vue")['default']>
    'LazyProfileForm': LazyComponent<typeof import("../components/profile/Form.vue")['default']>
    'LazyProfileUserCard': LazyComponent<typeof import("../components/profile/UserCard.vue")['default']>
    'LazyUiCalendar': LazyComponent<typeof import("../components/ui/Calendar.vue")['default']>
    'LazyUiConfirmationModal': LazyComponent<typeof import("../components/ui/ConfirmationModal.vue")['default']>
    'LazyUiFormField': LazyComponent<typeof import("../components/ui/FormField.vue")['default']>
    'LazyUiFormInput': LazyComponent<typeof import("../components/ui/FormInput.vue")['default']>
    'LazyUiFormSelect': LazyComponent<typeof import("../components/ui/FormSelect.vue")['default']>
    'LazyUiImageDropzone': LazyComponent<typeof import("../components/ui/ImageDropzone.vue")['default']>
    'LazyUiImageModal': LazyComponent<typeof import("../components/ui/ImageModal.vue")['default']>
    'LazyUiPagination': LazyComponent<typeof import("../components/ui/Pagination.vue")['default']>
    'LazyUiProfileVerificationCard': LazyComponent<typeof import("../components/ui/ProfileVerificationCard.vue")['default']>
    'LazyUiSessionTroubleshoot': LazyComponent<typeof import("../components/ui/SessionTroubleshoot.vue")['default']>
    'LazyUiToast': LazyComponent<typeof import("../components/ui/Toast.vue")['default']>
    'LazyUiUserAvatar': LazyComponent<typeof import("../components/ui/UserAvatar.vue")['default']>
    'LazyVehiclesAvailabilityModal': LazyComponent<typeof import("../components/vehicles/AvailabilityModal.vue")['default']>
    'LazyVehiclesBookingModal': LazyComponent<typeof import("../components/vehicles/BookingModal.vue")['default']>
    'LazyVehiclesFiltersSearch': LazyComponent<typeof import("../components/vehicles/FiltersSearch.vue")['default']>
    'LazyVehiclesFormModal': LazyComponent<typeof import("../components/vehicles/FormModal.vue")['default']>
    'LazyVehiclesPhotoCarousel': LazyComponent<typeof import("../components/vehicles/PhotoCarousel.vue")['default']>
    'LazyVehiclesPhotoPreview': LazyComponent<typeof import("../components/vehicles/PhotoPreview.vue")['default']>
    'LazyVehiclesVehicleAvailabilityCalendar': LazyComponent<typeof import("../components/vehicles/VehicleAvailabilityCalendar.vue")['default']>
    'LazyVehiclesVehicleCard': LazyComponent<typeof import("../components/vehicles/VehicleCard.vue")['default']>
    'LazyVehiclesVehicleGallery': LazyComponent<typeof import("../components/vehicles/VehicleGallery.vue")['default']>
    'LazyVehiclesVehicleOwnerInfo': LazyComponent<typeof import("../components/vehicles/VehicleOwnerInfo.vue")['default']>
    'LazyVehiclesVehicleOwnerStats': LazyComponent<typeof import("../components/vehicles/VehicleOwnerStats.vue")['default']>
    'LazyVehiclesVehicleSpecs': LazyComponent<typeof import("../components/vehicles/VehicleSpecs.vue")['default']>
    'LazyScriptAriaLoadingIndicator': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptAriaLoadingIndicator.vue")['default']>
    'LazyScriptCarbonAds': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCarbonAds.vue")['default']>
    'LazyScriptCrisp': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCrisp.vue")['default']>
    'LazyScriptGoogleAdsense': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleAdsense.vue")['default']>
    'LazyScriptGoogleMaps': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleMaps.vue")['default']>
    'LazyScriptIntercom': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptIntercom.vue")['default']>
    'LazyScriptLemonSqueezy': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLemonSqueezy.vue")['default']>
    'LazyScriptLoadingIndicator': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLoadingIndicator.vue")['default']>
    'LazyScriptStripePricingTable': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptStripePricingTable.vue")['default']>
    'LazyScriptVimeoPlayer': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptVimeoPlayer.vue")['default']>
    'LazyScriptYouTubePlayer': LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptYouTubePlayer.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const NavAuthMenu: typeof import("../components/NavAuthMenu.vue")['default']
export const NavFooter: typeof import("../components/NavFooter.vue")['default']
export const NavHeader: typeof import("../components/NavHeader.vue")['default']
export const AdminBookingsFilters: typeof import("../components/admin/BookingsFilters.vue")['default']
export const AdminBookingsTable: typeof import("../components/admin/BookingsTable.vue")['default']
export const AdminDrawer: typeof import("../components/admin/Drawer.vue")['default']
export const AdminNavbar: typeof import("../components/admin/Navbar.vue")['default']
export const AdminNavigation: typeof import("../components/admin/Navigation.vue")['default']
export const AdminProfile: typeof import("../components/admin/Profile.vue")['default']
export const AdminRecentBookings: typeof import("../components/admin/RecentBookings.vue")['default']
export const AdminRecentVehicles: typeof import("../components/admin/RecentVehicles.vue")['default']
export const AdminSidebar: typeof import("../components/admin/Sidebar.vue")['default']
export const AdminStatCards: typeof import("../components/admin/StatCards.vue")['default']
export const AdminUserMenu: typeof import("../components/admin/UserMenu.vue")['default']
export const AdminUsersFilters: typeof import("../components/admin/UsersFilters.vue")['default']
export const AdminUsersTable: typeof import("../components/admin/UsersTable.vue")['default']
export const AdminUsersToVerify: typeof import("../components/admin/UsersToVerify.vue")['default']
export const AdminVehicleDetailsModal: typeof import("../components/admin/VehicleDetailsModal.vue")['default']
export const AdminVehiclesFilters: typeof import("../components/admin/VehiclesFilters.vue")['default']
export const AdminVehiclesTable: typeof import("../components/admin/VehiclesTable.vue")['default']
export const BookingsBookingDetailsGrid: typeof import("../components/bookings/BookingDetailsGrid.vue")['default']
export const BookingsRenterRequestDetails: typeof import("../components/bookings/RenterRequestDetails.vue")['default']
export const BookingsRequestCard: typeof import("../components/bookings/RequestCard.vue")['default']
export const IconsDefaultAvatar: typeof import("../components/icons/DefaultAvatar.vue")['default']
export const MessagesChatMessages: typeof import("../components/messages/ChatMessages.vue")['default']
export const MessagesConversationsList: typeof import("../components/messages/ConversationsList.vue")['default']
export const MessagesInput: typeof import("../components/messages/Input.vue")['default']
export const ProfileCard: typeof import("../components/profile/Card.vue")['default']
export const ProfileDocumentUploadModal: typeof import("../components/profile/DocumentUploadModal.vue")['default']
export const ProfileDocuments: typeof import("../components/profile/Documents.vue")['default']
export const ProfileForm: typeof import("../components/profile/Form.vue")['default']
export const ProfileUserCard: typeof import("../components/profile/UserCard.vue")['default']
export const UiCalendar: typeof import("../components/ui/Calendar.vue")['default']
export const UiConfirmationModal: typeof import("../components/ui/ConfirmationModal.vue")['default']
export const UiFormField: typeof import("../components/ui/FormField.vue")['default']
export const UiFormInput: typeof import("../components/ui/FormInput.vue")['default']
export const UiFormSelect: typeof import("../components/ui/FormSelect.vue")['default']
export const UiImageDropzone: typeof import("../components/ui/ImageDropzone.vue")['default']
export const UiImageModal: typeof import("../components/ui/ImageModal.vue")['default']
export const UiPagination: typeof import("../components/ui/Pagination.vue")['default']
export const UiProfileVerificationCard: typeof import("../components/ui/ProfileVerificationCard.vue")['default']
export const UiSessionTroubleshoot: typeof import("../components/ui/SessionTroubleshoot.vue")['default']
export const UiToast: typeof import("../components/ui/Toast.vue")['default']
export const UiUserAvatar: typeof import("../components/ui/UserAvatar.vue")['default']
export const VehiclesAvailabilityModal: typeof import("../components/vehicles/AvailabilityModal.vue")['default']
export const VehiclesBookingModal: typeof import("../components/vehicles/BookingModal.vue")['default']
export const VehiclesFiltersSearch: typeof import("../components/vehicles/FiltersSearch.vue")['default']
export const VehiclesFormModal: typeof import("../components/vehicles/FormModal.vue")['default']
export const VehiclesPhotoCarousel: typeof import("../components/vehicles/PhotoCarousel.vue")['default']
export const VehiclesPhotoPreview: typeof import("../components/vehicles/PhotoPreview.vue")['default']
export const VehiclesVehicleAvailabilityCalendar: typeof import("../components/vehicles/VehicleAvailabilityCalendar.vue")['default']
export const VehiclesVehicleCard: typeof import("../components/vehicles/VehicleCard.vue")['default']
export const VehiclesVehicleGallery: typeof import("../components/vehicles/VehicleGallery.vue")['default']
export const VehiclesVehicleOwnerInfo: typeof import("../components/vehicles/VehicleOwnerInfo.vue")['default']
export const VehiclesVehicleOwnerStats: typeof import("../components/vehicles/VehicleOwnerStats.vue")['default']
export const VehiclesVehicleSpecs: typeof import("../components/vehicles/VehicleSpecs.vue")['default']
export const ScriptAriaLoadingIndicator: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptAriaLoadingIndicator.vue")['default']
export const ScriptCarbonAds: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCarbonAds.vue")['default']
export const ScriptCrisp: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCrisp.vue")['default']
export const ScriptGoogleAdsense: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleAdsense.vue")['default']
export const ScriptGoogleMaps: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleMaps.vue")['default']
export const ScriptIntercom: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptIntercom.vue")['default']
export const ScriptLemonSqueezy: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLemonSqueezy.vue")['default']
export const ScriptLoadingIndicator: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLoadingIndicator.vue")['default']
export const ScriptStripePricingTable: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptStripePricingTable.vue")['default']
export const ScriptVimeoPlayer: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptVimeoPlayer.vue")['default']
export const ScriptYouTubePlayer: typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptYouTubePlayer.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const Icon: typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNavAuthMenu: LazyComponent<typeof import("../components/NavAuthMenu.vue")['default']>
export const LazyNavFooter: LazyComponent<typeof import("../components/NavFooter.vue")['default']>
export const LazyNavHeader: LazyComponent<typeof import("../components/NavHeader.vue")['default']>
export const LazyAdminBookingsFilters: LazyComponent<typeof import("../components/admin/BookingsFilters.vue")['default']>
export const LazyAdminBookingsTable: LazyComponent<typeof import("../components/admin/BookingsTable.vue")['default']>
export const LazyAdminDrawer: LazyComponent<typeof import("../components/admin/Drawer.vue")['default']>
export const LazyAdminNavbar: LazyComponent<typeof import("../components/admin/Navbar.vue")['default']>
export const LazyAdminNavigation: LazyComponent<typeof import("../components/admin/Navigation.vue")['default']>
export const LazyAdminProfile: LazyComponent<typeof import("../components/admin/Profile.vue")['default']>
export const LazyAdminRecentBookings: LazyComponent<typeof import("../components/admin/RecentBookings.vue")['default']>
export const LazyAdminRecentVehicles: LazyComponent<typeof import("../components/admin/RecentVehicles.vue")['default']>
export const LazyAdminSidebar: LazyComponent<typeof import("../components/admin/Sidebar.vue")['default']>
export const LazyAdminStatCards: LazyComponent<typeof import("../components/admin/StatCards.vue")['default']>
export const LazyAdminUserMenu: LazyComponent<typeof import("../components/admin/UserMenu.vue")['default']>
export const LazyAdminUsersFilters: LazyComponent<typeof import("../components/admin/UsersFilters.vue")['default']>
export const LazyAdminUsersTable: LazyComponent<typeof import("../components/admin/UsersTable.vue")['default']>
export const LazyAdminUsersToVerify: LazyComponent<typeof import("../components/admin/UsersToVerify.vue")['default']>
export const LazyAdminVehicleDetailsModal: LazyComponent<typeof import("../components/admin/VehicleDetailsModal.vue")['default']>
export const LazyAdminVehiclesFilters: LazyComponent<typeof import("../components/admin/VehiclesFilters.vue")['default']>
export const LazyAdminVehiclesTable: LazyComponent<typeof import("../components/admin/VehiclesTable.vue")['default']>
export const LazyBookingsBookingDetailsGrid: LazyComponent<typeof import("../components/bookings/BookingDetailsGrid.vue")['default']>
export const LazyBookingsRenterRequestDetails: LazyComponent<typeof import("../components/bookings/RenterRequestDetails.vue")['default']>
export const LazyBookingsRequestCard: LazyComponent<typeof import("../components/bookings/RequestCard.vue")['default']>
export const LazyIconsDefaultAvatar: LazyComponent<typeof import("../components/icons/DefaultAvatar.vue")['default']>
export const LazyMessagesChatMessages: LazyComponent<typeof import("../components/messages/ChatMessages.vue")['default']>
export const LazyMessagesConversationsList: LazyComponent<typeof import("../components/messages/ConversationsList.vue")['default']>
export const LazyMessagesInput: LazyComponent<typeof import("../components/messages/Input.vue")['default']>
export const LazyProfileCard: LazyComponent<typeof import("../components/profile/Card.vue")['default']>
export const LazyProfileDocumentUploadModal: LazyComponent<typeof import("../components/profile/DocumentUploadModal.vue")['default']>
export const LazyProfileDocuments: LazyComponent<typeof import("../components/profile/Documents.vue")['default']>
export const LazyProfileForm: LazyComponent<typeof import("../components/profile/Form.vue")['default']>
export const LazyProfileUserCard: LazyComponent<typeof import("../components/profile/UserCard.vue")['default']>
export const LazyUiCalendar: LazyComponent<typeof import("../components/ui/Calendar.vue")['default']>
export const LazyUiConfirmationModal: LazyComponent<typeof import("../components/ui/ConfirmationModal.vue")['default']>
export const LazyUiFormField: LazyComponent<typeof import("../components/ui/FormField.vue")['default']>
export const LazyUiFormInput: LazyComponent<typeof import("../components/ui/FormInput.vue")['default']>
export const LazyUiFormSelect: LazyComponent<typeof import("../components/ui/FormSelect.vue")['default']>
export const LazyUiImageDropzone: LazyComponent<typeof import("../components/ui/ImageDropzone.vue")['default']>
export const LazyUiImageModal: LazyComponent<typeof import("../components/ui/ImageModal.vue")['default']>
export const LazyUiPagination: LazyComponent<typeof import("../components/ui/Pagination.vue")['default']>
export const LazyUiProfileVerificationCard: LazyComponent<typeof import("../components/ui/ProfileVerificationCard.vue")['default']>
export const LazyUiSessionTroubleshoot: LazyComponent<typeof import("../components/ui/SessionTroubleshoot.vue")['default']>
export const LazyUiToast: LazyComponent<typeof import("../components/ui/Toast.vue")['default']>
export const LazyUiUserAvatar: LazyComponent<typeof import("../components/ui/UserAvatar.vue")['default']>
export const LazyVehiclesAvailabilityModal: LazyComponent<typeof import("../components/vehicles/AvailabilityModal.vue")['default']>
export const LazyVehiclesBookingModal: LazyComponent<typeof import("../components/vehicles/BookingModal.vue")['default']>
export const LazyVehiclesFiltersSearch: LazyComponent<typeof import("../components/vehicles/FiltersSearch.vue")['default']>
export const LazyVehiclesFormModal: LazyComponent<typeof import("../components/vehicles/FormModal.vue")['default']>
export const LazyVehiclesPhotoCarousel: LazyComponent<typeof import("../components/vehicles/PhotoCarousel.vue")['default']>
export const LazyVehiclesPhotoPreview: LazyComponent<typeof import("../components/vehicles/PhotoPreview.vue")['default']>
export const LazyVehiclesVehicleAvailabilityCalendar: LazyComponent<typeof import("../components/vehicles/VehicleAvailabilityCalendar.vue")['default']>
export const LazyVehiclesVehicleCard: LazyComponent<typeof import("../components/vehicles/VehicleCard.vue")['default']>
export const LazyVehiclesVehicleGallery: LazyComponent<typeof import("../components/vehicles/VehicleGallery.vue")['default']>
export const LazyVehiclesVehicleOwnerInfo: LazyComponent<typeof import("../components/vehicles/VehicleOwnerInfo.vue")['default']>
export const LazyVehiclesVehicleOwnerStats: LazyComponent<typeof import("../components/vehicles/VehicleOwnerStats.vue")['default']>
export const LazyVehiclesVehicleSpecs: LazyComponent<typeof import("../components/vehicles/VehicleSpecs.vue")['default']>
export const LazyScriptAriaLoadingIndicator: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptAriaLoadingIndicator.vue")['default']>
export const LazyScriptCarbonAds: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCarbonAds.vue")['default']>
export const LazyScriptCrisp: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptCrisp.vue")['default']>
export const LazyScriptGoogleAdsense: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleAdsense.vue")['default']>
export const LazyScriptGoogleMaps: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptGoogleMaps.vue")['default']>
export const LazyScriptIntercom: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptIntercom.vue")['default']>
export const LazyScriptLemonSqueezy: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLemonSqueezy.vue")['default']>
export const LazyScriptLoadingIndicator: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptLoadingIndicator.vue")['default']>
export const LazyScriptStripePricingTable: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptStripePricingTable.vue")['default']>
export const LazyScriptVimeoPlayer: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptVimeoPlayer.vue")['default']>
export const LazyScriptYouTubePlayer: LazyComponent<typeof import("../node_modules/@nuxt/scripts/dist/runtime/components/ScriptYouTubePlayer.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
