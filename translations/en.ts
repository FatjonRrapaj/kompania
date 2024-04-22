export default {
  months: {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  },
  navigation: {
    back: "Back",
    login: "Login",
    register: "Register",
    forgotPassword: "Forgot password",
    newPackage: "New Package",
    packageFor: "Package for",
  },
  form: {
    isRequired: "is required",
    mustBeAtLeast: "must be at least",
    characters: "characters",
    mustBeAMaximum: "must be a maximum of",
    doesNotMatch: "does not match",
    isInvalid: "is invalid",
  },
  login: {
    loginTitle: "Login",
    enterInfo: "Enter your information below",
    enterEmail: "Enter Email",
    email: "email",
    password: "password",
    enterPassword: "Enter Password",
    forgotPassword: "Forgot Password?",
    login: "Login",
    orLoginWith: "Or login with",
    notOurMember: "Not our member yet?",
    registerNow: "Register Now",
  },
  home: {
    goodMorning: "Good Morning",
    goodDay: "Good Day",
    goodEvening: "Good Evening",
    allPackages: "All packages",
    completed: "completed",
    inProcess: "in process",
    problematic: "problematic",
    newPackage: "New package",
    scanPackage: "Scan Package",
    latest: "Latest",
    seeAll: "See all",
    noPackages: "You don't have any packages yet",
  },
  package: {
    pending: "Pending",
    completed: "Completed",
    problematic: "Problematic",
    client: "Client: ",
    available: "Ready",
    accepted: "Accepted",
    picked: "Picked",
    delivered: "Delivered",
    returned: "Returned",
    availableDescription: "Ready to be picked up",
    acceptedDescription: "Accepted from courier",
    pickedDescription: "Picked from courier",
    deliveredDescription: "Delivered to client",
    returnedDescription: "Returned",
    checkPackageDetails: "Check package details",
    trackingId: "Tracking Id:",
    copyTrackingId: "Copy tracking id",
    showQrCode: "Show QR Code",
    courier: "Courier:",
    callCourier: "Call courier",
    sendPackageReference: "Send package reference",
    address: "Address:",
    callClient: "Call the client",
    sendSmsToClient: "Send SMS to client",
    visitClientProfile: "Visit client profile",
    packageFor: "Package for",
    amount: "Amount",
    paymentAmount: "Payment amount:",
    shippingCost: "Shipping cost:",
    cashOnDelivery: "Cash on delivery:",
    dimensions: "Dimensions",
    width: "Width:",
    length: "Length:",
    height: "Height:",
    weight: "Weight:",
    specifics: "Specifics",
    isFragile: "Is Fragile:",
    canBeOpened: "Can be opened:",
    yes: "Yes",
    no: "No",
    notes: "Notes",
    notesForClient: "Notes for the client:",
    notesForPackage: "Notes for the package:",
    createdAtDate: "Package is created",
    postedAtDate: "Package is published",
    acceptedAtDate: "Package is accepted by courier",
    pickedAtDate: "Package is picked by courier",
    deliveredAtDate: "Package is delivered to client",
    returnedAtDate: "Package is returned",
    createdAt: "Created at",
    edit: "Edit",
    delete: "Delete",
  },
  createPackage: {
    receiverDetails: "Receiver Details",
    receiverNamePlaceHolder: "Receiver Name (auto suggestion)",
    receiverPhoneNumberPlaceholder: "Phone Number (auto suggestion)",
    profileLink: "Profile link",
    addressPlaceholder: "Adress",
    notesForReceiverPlaceholder: "Notes regarding the receiver",
    packageDetails: "Package Details",
    packageIdScanPlaceholder: "Package Id (scan)",
    packageNamePlaceholder: "Package Name",
    standard: "Standard",
    other: "Other",
    weightPlaceholder: "Weight (kg)",
    lenPlaceholder: "Len. (cm)",
    widPlaceholder: "Wid. (cm)",
    heiPlaceholder: "Hei. (cm)",
    fragile: "Fragile",
    canBeOpened: "Can be opened",
    paymentAmountPlaceholder: "Payment Amount",
    shippingCostPlaceholder: "Shipping Cost",
    cashOnDeliveryPlaceholder: "Cash on Delivery",
    notesForPackagePlaceholder: "Notes regarding the package",
    publishNow: "Publish Now",
    publishLater: "Publish Later",
    publishAt: "Publish at",
    packageCreated: "Package is successfully created",
    couriersNotified: "Our couriers are notified",
    view: "View package",
    currency: "Currency",
    receiverName: "Receiver name",
    receiverPhone: "Receiver phone number",
    receiverLink: "Profile link",
    address: "Address",
    notesForReceiver: "Notes for the receiver",
    packageId: "Package id",
    packageName: "Package name",
    weight: "Weight",
    len: "Length",
    wid: "Width",
    hei: "Height",
    paymentAmount: "Payment amount",
    shippingCost: "Shipping cost",
    cashOnDelivery: "Cash on delivery",
    notesForPackage: "Notes for the package",
  },
  firebaseErrors: {
    "auth/operation-not-allowed": {
      text1: "This action is not allowed.",
      text2: "Please contact support for assistance.",
    },
    "auth/requires-recent-login": {
      text1: "Please re-sign in to complete the action",
      text2: "For security reasons a recent sign in is required",
    },
    "auth/provider-already-linked": {
      text1: "This provider is already linked to your account.",
      text2: "",
    },
    "auth/invalid-credential": {
      text1: "The provided credential is invalid or has expired.",
      text2: "Please try a new one",
    },
    "auth/credential-already-in-use": {
      text1: "The credential is already in use.",
      text2: "Please try another one",
    },
    "auth/email-already-in-use": {
      text1: "The email address is already in user",
      text2: "Please sign in or enter a new one",
    },
    "auth/invalid-email": {
      text1: "The provided email address is not valid.",
      text2: "Please provide a valid email address.",
    },
    "auth/wrong-password": {
      text1: "The password is incorrect.",
      text2: "Please double-check your password.",
    },
    "auth/invalid-verification-code": {
      text1: "The verification code is invalid.",
      text2: "Please check it and try again.",
    },
    "auth/invalid-verification-id": {
      text1: "The verification ID is invalid.",
      text2: "Please check it and try again.",
    },
    "auth/user-mismatch": {
      text1: "The provided credential does not match the user.",
      text2: "Please try a different one",
    },
    "auth/user-not-found": {
      text1: "No user was found for the provided password reset code.",
      text2: "Make sure the information you provided is correct",
    },
    "auth/missing-ios-bundle-id": {
      text1: "Please provide an iOS Bundle ID if an App Store ID is provided.",
      text2: "Please contact support",
    },
    "auth/invalid-continue-uri": {
      text1: "The continue URL provided in the request is not valid.",
      text2: "Please contact support",
    },
    "auth/unauthorized-continue-uri": {
      text1: "The domain of the continue URL is not whitelisted.",
      text2: "Please contact support",
    },
    "auth/no-such-provider": {
      text1: "The provider is not linked to your account or does not exist.",
      text2: "Please contact support",
    },
    "auth/weak-password": {
      text1: "The password is not strong enough.",
      text2: "It should be longer and include special characters.",
    },
    "auth/invalid-phone-number": {
      text1: "The phone number format is invalid.",
      text2: "Please provide a valid phone number.",
    },
    "auth/missing-phone-number": {
      text1: "The phone number is missing.",
      text2: "Please provide a phone number.",
    },
    "auth/quota-exceeded": {
      text1: "The SMS quota for the Firebase project has been exceeded.",
      text2: "Please contact support",
    },
    "auth/user-disabled": {
      text1:
        "The user associated with the password reset code has been disabled.",
      text2: "Please create a new one or contact support",
    },
    "auth/custom-token-mismatch": {
      text1: "The custom token is for a different Firebase App.",
      text2: "Please contact support",
    },
    "auth/invalid-custom-token": {
      text1: "The custom token format is incorrect.",
      text2: "Please contact support",
    },
    "auth/account-exists-with-different-credential": {
      text1: "An account with this email address already exists.",
      text2: "Please sign in or provide new email",
    },
    "auth/argument-error": {
      text1: "An error occurred.",
      text2: "Please try again later.",
    },
    "auth/expired-action-code": {
      text1: "The password reset code has expired.",
      text2: "Please request a new one.",
    },
    "auth/invalid-action-code": {
      text1: "The password reset code is invalid or has already been used.",
      text2: "Please request a new one, or contact support if it wasn't you",
    },
    "auth/keychain-error": {
      text1: "An error occurred while accessing the keychain.",
      text2: "Please contact support",
    },
    "auth/app-deleted": {
      text1: "The Firebase App has been deleted.",
      text2: "Please contact support for assistance.",
    },
    "auth/app-not-authorized": {
      text1: "The app is not authorized for Firebase Authentication.",
      text2: "Please review your app's configuration in the Firebase Console.",
    },
    "auth/invalid-api-key": {
      text1: "The provided API key is invalid.",
      text2:
        "Please verify that you have copied it correctly from the Firebase Console.",
    },
    "auth/invalid-user-token": {
      text1: "The user's credential is no longer valid.",
      text2: "The user must sign in again to resolve this issue.",
    },
    "auth/invalid-tenant-id": {
      text1: "The provided tenant ID is invalid.",
      text2: "Please ensure you have provided a valid tenant ID.",
    },
    "auth/network-request-failed": {
      text1: "A network error has occurred.",
      text2: "Please check your network connection and try again.",
    },
    "auth/too-many-requests": {
      text1: "Too many requests are being made from this device.",
      text2: "Please wait for some time and try again later.",
    },
    "auth/unauthorized-domain": {
      text1: "The app domain is not authorized for OAuth operations.",
      text2: "Please configure authorized domains in the Firebase Console.",
    },
    "auth/user-token-expired": {
      text1: "The user's credential has expired.",
      text2: "Please sign out and sign in again to resolve this issue.",
    },
    "auth/web-storage-unsupported": {
      text1: "Web storage is not supported by the browser.",
      text2: "Please enable web storage or try another web browser.",
    },
    "auth/claims-too-large": {
      text1: "The custom claims payload exceeds the maximum allowed size.",
      text2: "Please reduce the size of custom claims.",
    },
    "auth/id-token-expired": {
      text1: "The provided Firebase ID token has expired.",
      text2: "Please sign out and sign in again to get a new token.",
    },
    "auth/id-token-revoked": {
      text1: "The provided Firebase ID token has been revoked.",
      text2: "Please sign out and sign in again to get a new token.",
    },
    "auth/insufficient-permission": {
      text1: "The Admin SDK has insufficient permissions.",
      text2: "Please configure the Admin SDK with appropriate permissions.",
    },
    "auth/internal-error": {
      text1: "An unexpected error occurred on the Authentication server.",
      text2: "Please report the problem to our support channel if it persists.",
    },
    "auth/invalid-argument": {
      text1: "An invalid argument was provided to an Authentication method.",
      text2: "Please check the provided arguments and try again.",
    },
    "auth/invalid-claims": {
      text1: "The custom claim attributes are invalid.",
      text2: "Please check the provided custom claim attributes.",
    },
    "auth/invalid-email-verified": {
      text1: "The emailVerified value is invalid.",
      text2: "Please make sure it is a boolean value.",
    },
    "auth/invalid-hash-algorithm": {
      text1: "The hash algorithm is not supported.",
      text2: "Please use a supported hashing algorithm.",
    },
    "auth/invalid-hash-block-size": {
      text1: "The hash block size is invalid.",
      text2: "Please provide a valid number for the block size.",
    },
    "auth/invalid-hash-derived-key-length": {
      text1: "The hash derived key length is invalid.",
      text2: "Please provide a valid number for the key length.",
    },
    "auth/invalid-hash-key": {
      text1: "The hash key is invalid.",
      text2: "Please provide a valid byte buffer for the hash key.",
    },
    "auth/invalid-hash-memory-cost": {
      text1: "The hash memory cost is invalid.",
      text2: "Please provide a valid number for the memory cost.",
    },
    "auth/invalid-hash-parallelization": {
      text1: "The hash parallelization is invalid.",
      text2: "Please provide a valid number for the parallelization.",
    },
    "auth/invalid-hash-rounds": {
      text1: "The hash rounds value is invalid.",
      text2: "Please provide a valid number of rounds.",
    },
    "auth/invalid-hash-salt-separator": {
      text1: "The salt separator for the hashing algorithm is invalid.",
      text2: "Please provide a valid byte buffer for the salt separator.",
    },
    "auth/invalid-id-token": {
      text1: "The provided ID token is not a valid Firebase ID token.",
      text2: "Please ensure you are using a valid ID token.",
    },
    "auth/invalid-last-sign-in-time": {
      text1: "The last sign-in time is invalid.",
      text2:
        "Please provide a valid UTC date string for the last sign-in time.",
    },
    "auth/invalid-page-token": {
      text1: "The provided page token is invalid.",
      text2: "Please provide a valid non-empty string for the page token.",
    },
    "auth/invalid-password": {
      text1: "The provided password is invalid.",
      text2: "Please provide a password with at least six characters.",
    },
    "auth/invalid-password-hash": {
      text1: "The password hash is invalid.",
      text2: "Please provide a valid byte buffer for the password hash.",
    },
    "auth/invalid-password-salt": {
      text1: "The password salt is invalid.",
      text2: "Please provide a valid byte buffer for the password salt.",
    },
    "auth/invalid-photo-url": {
      text1: "The provided photoURL is invalid.",
      text2: "Please provide a valid string URL for the photoURL.",
    },
    "auth/invalid-provider-data": {
      text1: "The providerData is invalid.",
      text2: "Please provide a valid array of UserInfo objects.",
    },
    "auth/invalid-provider-id": {
      text1: "The providerId is invalid.",
      text2: "Please provide a valid supported provider identifier string.",
    },
    "auth/invalid-oauth-responsetype": {
      text1: "Invalid OAuth responseType configuration.",
      text2: "Please configure only one OAuth responseType to be set to true.",
    },
    "auth/invalid-session-cookie-duration": {
      text1: "The session cookie duration is invalid.",
      text2:
        "Please provide a valid number in milliseconds between 5 minutes and 2 weeks.",
    },
    "auth/invalid-uid": {
      text1: "The provided UID is invalid.",
      text2:
        "Please provide a non-empty string with at most 128 characters for the UID.",
    },
    "auth/invalid-user-import": {
      text1: "The user record to import is invalid.",
      text2: "Please check the provided user record for import.",
    },
    "auth/maximum-user-count-exceeded": {
      text1: "The maximum allowed number of users to import has been exceeded.",
      text2:
        "Please ensure you do not exceed the maximum user count for import.",
    },
    "auth/missing-android-pkg-name": {
      text1: "The Android Package Name is missing.",
      text2: "Please provide an Android Package Name if required.",
    },
    "auth/missing-continue-uri": {
      text1: "A valid continue URL is missing.",
      text2: "Please provide a valid continue URL in the request.",
    },
    "auth/missing-hash-algorithm": {
      text1: "The hashing algorithm and its parameters are missing.",
      text2:
        "Please provide the required hashing algorithm and parameters for user import.",
    },
    "auth/missing-uid": {
      text1: "The UID is missing.",
      text2: "Please provide a UID identifier for the current operation.",
    },
    "auth/missing-oauth-client-secret": {
      text1: "The OAuth client secret is missing.",
      text2:
        "Please provide the required OAuth client secret to enable OIDC code flow.",
    },
    "auth/phone-number-already-exists": {
      text1: "The provided phone number is already in use by an existing user.",
      text2: "Each user must have a unique phone number.",
    },
    "auth/project-not-found": {
      text1: "No Firebase project was found for the provided credential.",
      text2: "Please ensure you have the correct Firebase project credential.",
    },
    "auth/reserved-claims": {
      text1: "One or more custom user claims are reserved.",
      text2: "Please avoid using reserved claims for custom user claims.",
    },
    "auth/session-cookie-expired": {
      text1: "The provided Firebase session cookie has expired.",
      text2:
        "Please ensure you are using a valid and unexpired session cookie.",
    },
    "auth/session-cookie-revoked": {
      text1: "The Firebase session cookie has been revoked.",
      text2: "Please ensure you are using a valid session cookie.",
    },
    "auth/uid-already-exists": {
      text1: "The provided UID is already in use by an existing user.",
      text2: "Each user must have a unique UID.",
    },
    "storage/unknown": {
      text1: "An unknown error occurred.",
      text2: "Contact support for assistance.",
    },
    "storage/object-not-found": {
      text1: "No object exists at the desired reference.",
      text2: "Check the reference and try again.",
    },
    "storage/bucket-not-found": {
      text1: "No bucket is configured for Cloud Storage.",
      text2: "Please contact support",
    },
    "storage/project-not-found": {
      text1: "No project is configured for Cloud Storage.",
      text2: "Configure a project and try again.",
    },
    "storage/quota-exceeded": {
      text1: "Quota on your Cloud Storage bucket has been exceeded.",
      text2: "Please contact support",
    },
    "storage/unauthenticated": {
      text1: "Please re-sign in to complete this action",
      text2: "Ensure you are authenticated and try the action again.",
    },
    "storage/unauthorized": {
      text1: "You are not authorized to perform the desired action.",
      text2: "Check your security rules to ensure they are correct.",
    },
    "storage/retry-limit-exceeded": {
      text1: "The maximum time limit on an operation has been exceeded.",
      text2: "Please try the operation again.",
    },
    "storage/invalid-checksum": {
      text1:
        "The file on the client does not match the checksum of the file\nreceived by the server.",
      text2: "Try uploading the file again.",
    },
    "storage/canceled": {
      text1: "The operation was cancelled.",
      text2: "Please initiate the operation again if needed.",
    },
    "storage/invalid-event-name": {
      text1: "Something went wrong",
      text2: "Invalid event name provided.",
    },
    "storage/invalid-url": {
      text1: "Invalid URL provided.",
      text2: "Please contact support",
    },
    "storage/invalid-argument": {
      text1: "Invalid argument provided",
      text2: "We will fix this error soon.",
    },
    "storage/no-default-bucket": {
      text1: "Something went wrong", //  "No bucket has been set in your config's storageBucket property.",

      text2: "Please contact support",
    },
    "storage/cannot-slice-blob": {
      text1: "Commonly occurs when the local file has changed.",
      text2:
        "Try uploading the file again after verifying that it hasn't changed.",
    },
    "storage/server-file-wrong-size": {
      text1:
        "The file on the client does not match the size of the file received by the server.",
      text2: "Try uploading the file again.",
    },
  },
  toastMessages: {
    userNotLoggedIn: "User is not logged in.",
    userDocumentNotFound: "User document not found.",
    companyDocumentNotFound: "Company document not found.",
    companyIdNotFound: "CompanyId not found in user data.",
    failedToGetUserCompany: "Failed to get user company.",
    failedToAddPackage: "Failed to add package.",
    somethingWrongText1: "Something went wrong",
    somethingWrongText2: "We were't able to process your request",
    verifyEmailSentText1: "Verification email sent",
    checkEmailText2: "Please check your email",
    passwordResetEmailSentText1: "Password Reset Email Sent",
    updateNameSuccess: "Successfully updated name",
    updatePhoneSuccess: "Successfully updated phone number",
    changePasswordSuccess: "Successfully changed password",
    passwordIncorrect: "The provided password is incorrect",
    pleaseTryAgainText2: "Please try again",
    copiedPackageId: "Package Scan Id is copied",
  },
};
