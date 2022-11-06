export const emailFooter = () => '<p>Merci d’avoir choisi'
    + '<a href="'+ process.env.SITE_URL + '"> ' + process.env.SITE_NAME + ' </a>'
    + 'comme solution de recherche de documents.</p>'
    + '<p>Bien Cordialement</p>';

export const CONSTANTS = {
    userCreatedEvent: 'user.created',
    userEmailVerifiedEvent: 'user.email.verified',
    userKYCVerified: 'user.kyc.verified',
    userFulfillRegistration: 'user.fulfill.registration'
}