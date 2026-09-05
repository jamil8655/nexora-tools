export type Language = 'en' | 'ar' | 'ur' | 'hi';

export interface Translations {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  popularTools: string;
  allTools: string;
  exploreCategories: string;
  privacyNotice: string;
  clientSideBadge: string;
  serverSideBadge: string;
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  chooseFiles: string;
  processing: string;
  download: string;
  downloadAllZip: string;
  startAgain: string;
  savedPercentage: string;
  originalSize: string;
  compressedSize: string;
  nav: {
    home: string;
    courses: string;
    dashboard: string;
    pdfTools: string;
    imageTools: string;
    documents: string;
    textTools: string;
    compress: string;
    ocr: string;
    calculators: string;
    devTools: string;
    security: string;
    qrBarcode: string;
    aiTools: string;
    pdfEditor: string;
    workflows: string;
    allTools: string;
    quiz: string;
    myTools: string;
    favorites: string;
    history: string;
    downloads: string;
    notifications: string;
    settings: string;
    admin: string;
    login: string;
    signup: string;
    logout: string;
    myProfile: string;
  };
  courses: {
    title: string;
    subtitle: string;
    browse: string;
    myCourses: string;
    allCategories: string;
    freePreview: string;
    enrollFree: string;
    enrolled: string;
    continueLearning: string;
    resume: string;
    progress: string;
    completed: string;
    lessons: string;
    duration: string;
    instructor: string;
    curriculum: string;
    overview: string;
    certificate: string;
    certificateDesc: string;
    noEnrollmentRequired: string;
    enrollmentBenefitsTitle: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    filterByLevel: string;
    allLevels: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    searchCourses: string;
    noCoursesFound: string;
    viewDetails: string;
    startCourse: string;
    lessonLocked: string;
    lessonPreview: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    emailAddress: string;
    password: string;
    fullName: string;
    forgotPassword: string;
    resetPassword: string;
    sendResetLink: string;
    resetLinkSent: string;
    rememberMe: string;
    showPassword: string;
    hidePassword: string;
    continueWithGoogle: string;
    orEmail: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    createAccount: string;
    emailVerification: string;
    emailVerified: string;
    emailNotVerified: string;
    resendVerification: string;
    verificationSent: string;
    invalidCredentials: string;
    accountCreatedSuccess: string;
    loginSuccess: string;
    logoutSuccess: string;
    passwordMinLength: string;
    enterEmailPassword: string;
    enterAllFields: string;
    registrationFailed: string;
    enterEmailForReset: string;
    authSubtitle: string;
  };
  userDashboard: {
    welcomeBack: string;
    overview: string;
    myToolsTitle: string;
    myToolsSubtitle: string;
    favoritesTitle: string;
    favoritesSubtitle: string;
    historyTitle: string;
    historySubtitle: string;
    downloadsTitle: string;
    downloadsSubtitle: string;
    notificationsTitle: string;
    notificationsSubtitle: string;
    settingsTitle: string;
    settingsSubtitle: string;
    profileTitle: string;
    bioPlaceholder: string;
    saveProfile: string;
    profileUpdated: string;
    joinedOn: string;
    accountStatus: string;
    verified: string;
    unverified: string;
    clearHistory: string;
    clearAll: string;
    noHistory: string;
    noFavorites: string;
    noDownloads: string;
    noNotifications: string;
    markAllAsRead: string;
    downloadAgain: string;
    deleteItem: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    updatePasswordBtn: string;
  };
  settings: {
    accountTab: string;
    appearanceTab: string;
    languageTab: string;
    notificationsTab: string;
    privacyTab: string;
    securityTab: string;
    themeMode: string;
    lightTheme: string;
    darkTheme: string;
    systemTheme: string;
    selectLanguage: string;
    emailNotifications: string;
    courseUpdates: string;
    toolAlerts: string;
    securityAlerts: string;
    marketingAnnouncements: string;
    dataStorage: string;
    localStorageNotice: string;
    clearCache: string;
    cacheCleared: string;
  };
  admin: {
    controlCenter: string;
    analytics: string;
    userManagement: string;
    courseManagement: string;
    toolsManagement: string;
    contentManager: string;
    systemSettings: string;
    totalUsers: string;
    activeUsers: string;
    totalCourses: string;
    totalToolRuns: string;
    systemHealth: string;
    addCourse: string;
    editCourse: string;
    deleteCourse: string;
    publishCourse: string;
    draftCourse: string;
    enableTool: string;
    disableTool: string;
    searchUsers: string;
    roleAdmin: string;
    roleUser: string;
    makeAdmin: string;
    removeAdmin: string;
    maintenanceMode: string;
    allowRegistration: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    aboutPlatform: string;
    courses: string;
    tools: string;
    features: string;
    helpSupport: string;
    contactUs: string;
    privacyPolicy: string;
    terms: string;
    refundPolicy: string;
    disclaimer: string;
    faq: string;
    userGuidelines: string;
    rights: string;
    poweredBy: string;
    clientSideSecurity: string;
  };
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    remove: string;
    open: string;
    close: string;
    back: string;
    next: string;
    finish: string;
    confirm: string;
    loading: string;
    success: string;
    error: string;
    all: string;
    free: string;
    pro: string;
    enterprise: string;
    filter: string;
    search: string;
    viewAll: string;
    noData: string;
    fileSize: string;
    date: string;
    status: string;
    action: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    startQuiz: string;
    nextQuestion: string;
    prevQuestion: string;
    submitQuiz: string;
    score: string;
    passed: string;
    failed: string;
    retake: string;
    explanation: string;
    question: string;
    of: string;
    correctAnswer: string;
    yourAnswer: string;
    congratulations: string;
    tryAgain: string;
    selectQuiz: string;
  };
  dialogs: {
    confirmTitle: string;
    confirmMessage: string;
    deleteConfirmation: string;
    saveChanges: string;
    discardChanges: string;
    searchModalTitle: string;
    searchModalPlaceholder: string;
  };
  errors: {
    general: string;
    notFound: string;
    unauthorized: string;
    fileTooLarge: string;
    invalidFileType: string;
    networkError: string;
    tryAgainLater: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  // ==================== ENGLISH ====================
  en: {
    appName: 'NEXORA PRO',
    tagline: 'Powerful Tools & Learning Platform for Every File and Digital Skill.',
    heroTitle: 'Master Digital Skills & Transform Files in One Workspace',
    heroSubtitle: 'Learn modern web, AI, document mastery, and execute 220+ lightning-fast, privacy-first client-side file tools with zero server tracking.',
    searchPlaceholder: 'Search 220+ tools, courses, workflows, or actions (e.g. PDF to Word, Python AI, Compress Image)...',
    popularTools: 'Popular & Essential Tools',
    allTools: 'All 220+ Digital Tools',
    exploreCategories: 'Explore by Category',
    privacyNotice: 'Zero Server Uploads â€¢ 100% Private Client-Side Processing.',
    clientSideBadge: 'Processed Locally (100% Private)',
    serverSideBadge: 'Cloud Engine',
    dropzoneTitle: 'Drag & Drop your files here',
    dropzoneSubtitle: 'or click to browse files from your device',
    chooseFiles: 'Choose Files',
    processing: 'Processing files...',
    download: 'Download Result',
    downloadAllZip: 'Download All (ZIP)',
    startAgain: 'Process Another File',
    savedPercentage: 'Saved',
    originalSize: 'Original Size',
    compressedSize: 'New Size',
    nav: {
      home: 'Home',
      courses: 'Courses',
      dashboard: 'Dashboard',
      pdfTools: 'PDF Tools',
      imageTools: 'Image Tools',
      documents: 'Documents',
      textTools: 'Text Tools',
      compress: 'Compress',
      ocr: 'OCR Studio',
      calculators: 'Calculators',
      devTools: 'Developer',
      security: 'Security',
      qrBarcode: 'QR & Barcode',
      aiTools: 'AI Workspace',
      pdfEditor: 'PDF Editor',
      workflows: 'Workflows',
      allTools: 'All Tools',
      quiz: 'Skill Quizzes',
      myTools: 'My Tools',
      favorites: 'Favorites',
      history: 'History',
      downloads: 'Downloads',
      notifications: 'Notifications',
      settings: 'Settings',
      admin: 'Admin Center',
      login: 'Log In',
      signup: 'Sign Up',
      logout: 'Log Out',
      myProfile: 'My Profile',
    },
    courses: {
      title: 'Explore Master Courses',
      subtitle: 'Free and open learning paths. Browse curriculum, preview lessons freely, or enroll to track your progress and earn certificates.',
      browse: 'Browse Courses',
      myCourses: 'My Enrolled Courses',
      allCategories: 'All Categories',
      freePreview: 'Free Preview',
      enrollFree: 'Enroll for Free',
      enrolled: 'Enrolled',
      continueLearning: 'Continue Learning',
      resume: 'Resume Lesson',
      progress: 'Course Progress',
      completed: 'Completed',
      lessons: 'Lessons',
      duration: 'Total Duration',
      instructor: 'Instructor',
      curriculum: 'Curriculum & Lessons',
      overview: 'Course Overview',
      certificate: 'Completion Certificate',
      certificateDesc: 'Earn a verified digital certificate upon finishing all course modules and projects.',
      noEnrollmentRequired: 'No enrollment required to view previews and study course content.',
      enrollmentBenefitsTitle: 'Why Enroll in a Course?',
      benefit1: 'Save progress and pick up right where you left off',
      benefit2: 'Track completed lessons and milestone achievements',
      benefit3: 'Access interactive project files and downloadable tool templates',
      benefit4: 'Receive direct updates, notifications, and course completion badges',
      filterByLevel: 'Filter by Level',
      allLevels: 'All Levels',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      searchCourses: 'Search courses by title, topic, or technology...',
      noCoursesFound: 'No courses match your search or filter criteria.',
      viewDetails: 'View Curriculum',
      startCourse: 'Start Learning Now',
      lessonLocked: 'Enroll to track completion',
      lessonPreview: 'Free Preview Available',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      emailAddress: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      sendResetLink: 'Send Password Reset Link',
      resetLinkSent: 'Password reset link sent to your email. Check your inbox.',
      rememberMe: 'Remember me on this device',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      continueWithGoogle: 'Continue with Google',
      orEmail: 'or continue with email',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      createAccount: 'Create Free Account',
      emailVerification: 'Email Verification',
      emailVerified: 'Verified Account',
      emailNotVerified: 'Email not verified yet',
      resendVerification: 'Resend Verification Email',
      verificationSent: 'Verification email sent! Please check your inbox.',
      invalidCredentials: 'Invalid email or password. Please verify and try again.',
      accountCreatedSuccess: 'Account created successfully! Welcome to NEXORA PRO.',
      loginSuccess: 'Signed in successfully!',
      logoutSuccess: 'Signed out safely.',
      passwordMinLength: 'Password must be at least 6 characters.',
      enterEmailPassword: 'Please enter both email and password.',
      enterAllFields: 'Please enter your full name, email, and password.',
      registrationFailed: 'Registration failed. Please try again.',
      enterEmailForReset: 'Please enter your email address to receive the reset link.',
      authSubtitle: 'Pure Client-Side Secure Authentication',
    },
    userDashboard: {
      welcomeBack: 'Welcome back',
      overview: 'Account Overview',
      myToolsTitle: 'My Tools & Shortcuts',
      myToolsSubtitle: 'Quickly access your most frequent and pinned productivity utilities.',
      favoritesTitle: 'Bookmarked Favorites',
      favoritesSubtitle: 'Your saved tools and bookmarked learning courses in one convenient list.',
      historyTitle: 'Activity & Conversion History',
      historySubtitle: 'Review recently processed files, opened tools, and studied lessons.',
      downloadsTitle: 'Downloads & Generated Files',
      downloadsSubtitle: 'Access and re-download your locally generated PDFs, images, and converted files.',
      notificationsTitle: 'Notification Center',
      notificationsSubtitle: 'Stay up-to-date with course releases, tool enhancements, and platform announcements.',
      settingsTitle: 'Preferences & Settings',
      settingsSubtitle: 'Customize your theme, language, notifications, and security options.',
      profileTitle: 'Profile Information',
      bioPlaceholder: 'Write a short bio about yourself or your skills...',
      saveProfile: 'Save Profile Changes',
      profileUpdated: 'Profile updated successfully!',
      joinedOn: 'Member Since',
      accountStatus: 'Account Status',
      verified: 'Verified',
      unverified: 'Unverified',
      clearHistory: 'Clear Activity History',
      clearAll: 'Clear All',
      noHistory: 'No activity recorded yet. Start exploring tools and courses!',
      noFavorites: 'No favorites bookmarked yet. Click the star on any tool or course to save it here.',
      noDownloads: 'No generated files yet. Process any tool to see your download history.',
      noNotifications: 'You have no new notifications.',
      markAllAsRead: 'Mark All as Read',
      downloadAgain: 'Download Again',
      deleteItem: 'Remove Item',
      changePassword: 'Change Account Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      updatePasswordBtn: 'Update Password',
    },
    settings: {
      accountTab: 'Account',
      appearanceTab: 'Appearance',
      languageTab: 'Language',
      notificationsTab: 'Notifications',
      privacyTab: 'Privacy',
      securityTab: 'Security',
      themeMode: 'Theme Mode',
      lightTheme: 'Light Mode',
      darkTheme: 'Dark Mode',
      systemTheme: 'System Default',
      selectLanguage: 'Select App Language',
      emailNotifications: 'Email Notifications',
      courseUpdates: 'Course & Curriculum Updates',
      toolAlerts: 'New Tool Releases & Upgrades',
      securityAlerts: 'Account & Security Alerts',
      marketingAnnouncements: 'Product News & Tips',
      dataStorage: 'Local Data & Cache',
      localStorageNotice: 'NEXORA stores your tool preferences, history, and favorites securely on your device.',
      clearCache: 'Clear Local Storage Cache',
      cacheCleared: 'Local cache cleared successfully.',
    },
    admin: {
      controlCenter: 'NEXORA Admin Control Center',
      analytics: 'Analytics & Telemetry',
      userManagement: 'User Management',
      courseManagement: 'Course Management',
      toolsManagement: 'Tools Control',
      contentManager: 'Content & Translations',
      systemSettings: 'Platform Settings',
      totalUsers: 'Total Registered Users',
      activeUsers: 'Active Sessions',
      totalCourses: 'Published Courses',
      totalToolRuns: 'Total File Executions',
      systemHealth: 'System Health & Node Status',
      addCourse: 'Create New Course',
      editCourse: 'Edit Course',
      deleteCourse: 'Delete Course',
      publishCourse: 'Publish',
      draftCourse: 'Save Draft',
      enableTool: 'Enable Tool',
      disableTool: 'Disable Tool',
      searchUsers: 'Search users by name, email, or role...',
      roleAdmin: 'Administrator',
      roleUser: 'Standard User',
      makeAdmin: 'Promote to Admin',
      removeAdmin: 'Demote to User',
      maintenanceMode: 'Platform Maintenance Mode',
      allowRegistration: 'Allow New User Signups',
    },
    footer: {
      desc: 'NEXORA PRO is the premier digital ecosystem combining free high-performance client-side utility tools with comprehensive developer & digital skill courses.',
      quickLinks: 'Navigation',
      aboutPlatform: 'About Platform',
      courses: 'Explore Courses',
      tools: 'All 220+ Tools',
      features: 'Key Features',
      helpSupport: 'Help & Support',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Service',
      refundPolicy: 'Refund Policy',
      disclaimer: 'Legal Disclaimer',
      faq: 'Frequently Asked Questions',
      userGuidelines: 'User Guidelines',
      rights: 'All rights reserved.',
      poweredBy: '100% Client-Side Private Processing Engine.',
      clientSideSecurity: 'No files are ever uploaded or stored on external servers.',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      remove: 'Remove',
      open: 'Open',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      confirm: 'Confirm',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      all: 'All',
      free: 'Free',
      pro: 'Pro',
      enterprise: 'Enterprise',
      filter: 'Filter',
      search: 'Search',
      viewAll: 'View All',
      noData: 'No data available',
      fileSize: 'File Size',
      date: 'Date',
      status: 'Status',
      action: 'Action',
    },
    quiz: {
      title: 'Skills & Knowledge Checks',
      subtitle: 'Test your understanding across full-stack development, Python AI, and privacy engineering with interactive assessments.',
      startQuiz: 'Start Knowledge Check',
      nextQuestion: 'Next Question',
      prevQuestion: 'Previous',
      submitQuiz: 'Submit & View Results',
      score: 'Your Score',
      passed: 'Assessment Passed! ðŸŽ‰',
      failed: 'Keep Practicing',
      retake: 'Retake Quiz',
      explanation: 'Explanation & Key Insight',
      question: 'Question',
      of: 'of',
      correctAnswer: 'Correct Answer',
      yourAnswer: 'Your Answer',
      congratulations: 'Congratulations! You demonstrated strong mastery.',
      tryAgain: 'Review the lessons and try again to improve your score.',
      selectQuiz: 'Select a Topic to Test',
    },
    dialogs: {
      confirmTitle: 'Confirm Action',
      confirmMessage: 'Are you sure you want to proceed with this operation?',
      deleteConfirmation: 'This item will be permanently removed from your workspace.',
      saveChanges: 'Save Changes',
      discardChanges: 'Discard',
      searchModalTitle: 'Universal Platform Search',
      searchModalPlaceholder: 'Search 220+ tools, courses, lessons, and workflows...',
    },
    errors: {
      general: 'An unexpected issue occurred. Please try again.',
      notFound: 'The requested resource or page could not be located.',
      unauthorized: 'You must be signed in with proper permissions to access this feature.',
      fileTooLarge: 'Selected file exceeds the maximum 500 MB client-side engine limit.',
      invalidFileType: 'Unsupported file format. Please select a valid document or image.',
      networkError: 'Network request failed. Please check your internet connection.',
      tryAgainLater: 'Operation timed out. Please retry in a few moments.',
    },
  },

  // ==================== URDU (Ø§Ø±Ø¯Ùˆ) ====================
  ur: {
    appName: 'Ù†ÛŒÚ©Ø³ÙˆØ±Ø§ Ù¾Ø±Ùˆ',
    tagline: 'ÛØ± Ù‚Ø³Ù… Ú©ÛŒ ÙØ§Ø¦Ù„ØŒ Ø¯Ø³ØªØ§ÙˆÛŒØ² Ø§ÙˆØ± ÚˆÛŒØ¬ÛŒÙ¹Ù„ Ø§Ø³Ú©Ù„ Ú©Û’ Ù„ÛŒÛ’ Ø·Ø§Ù‚ØªÙˆØ± Ù¹ÙˆÙ„Ø² Ø§ÙˆØ± Ù„Ø±Ù†Ù†Ú¯ Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù…Û”',
    heroTitle: 'ÚˆÛŒØ¬ÛŒÙ¹Ù„ Ù…ÛØ§Ø±ØªÛŒÚº Ø³ÛŒÚ©Ú¾ÛŒÚº Ø§ÙˆØ± ÙØ§Ø¦Ù„ÙˆÚº Ú©Ùˆ Ù…Ø­ÙÙˆØ¸ Ø·Ø±ÛŒÙ‚Û’ Ø³Û’ ØªØ¨Ø¯ÛŒÙ„ Ú©Ø±ÛŒÚº',
    heroSubtitle: 'Ø¬Ø¯ÛŒØ¯ ÙˆÛŒØ¨ ÚˆÛŒÙˆÙ„Ù¾Ù…Ù†Ù¹ØŒ Ø§Û’ Ø¢Ø¦ÛŒ Ø§ÙˆØ± Ø¯Ø³ØªØ§ÙˆÛŒØ²Ø§Øª Ú©ÛŒ Ù…ÛØ§Ø±Øª Ø­Ø§ØµÙ„ Ú©Ø±ÛŒÚº Ø§ÙˆØ± 75 Ø³Û’ Ø²Ø§Ø¦Ø¯ ØªÛŒØ² Ø±ÙØªØ§Ø± Ù¾Ø±Ø§Ø¦ÛŒÙˆÛŒÙ¹ Ù¹ÙˆÙ„Ø² Ø¨ØºÛŒØ± Ú©Ø³ÛŒ Ø³Ø±ÙˆØ± Ø§Ù¾Ù„ÙˆÚˆ Ú©Û’ Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ú©Ø±ÛŒÚºÛ”',
    searchPlaceholder: '220+ Ù¹ÙˆÙ„Ø²ØŒ Ú©ÙˆØ±Ø³Ø² ÛŒØ§ Ø§ÛŒÚ©Ø´Ù†Ø² ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº (Ù…Ø«Ù„Ø§Ù‹ Ù¾ÛŒ ÚˆÛŒ Ø§ÛŒÙ Ø³Û’ ÙˆØ±ÚˆØŒ Ø§Ù…ÛŒØ¬ Ú©Ù…Ù¾Ø±ÛŒØ³)...',
    popularTools: 'Ù…Ù‚Ø¨ÙˆÙ„ Ø§ÙˆØ± Ø§ÛÙ… Ù¹ÙˆÙ„Ø²',
    allTools: 'ØªÙ…Ø§Ù… 220+ ÚˆÛŒØ¬ÛŒÙ¹Ù„ Ù¹ÙˆÙ„Ø²',
    exploreCategories: 'Ú©ÛŒÙ¹ÛŒÚ¯Ø±ÛŒ Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº',
    privacyNotice: 'Ø²ÛŒØ±Ùˆ Ø³Ø±ÙˆØ± Ø§Ù¾Ù„ÙˆÚˆ â€¢ 100% Ù†Ø¬ÛŒ Ú©Ù„Ø§Ø¦Ù†Ù¹ Ø³Ø§Ø¦ÛŒÚˆ Ù¾Ø±ÙˆØ³ÛŒØ³Ù†Ú¯Û”',
    clientSideBadge: 'Ù…Ù‚Ø§Ù…ÛŒ Ø·ÙˆØ± Ù¾Ø± Ù¾Ø±ÙˆØ³ÛŒØ³ Ø´Ø¯Û (100% Ù…Ø­ÙÙˆØ¸)',
    serverSideBadge: 'Ú©Ù„Ø§Ø¤Úˆ Ø§Ù†Ø¬Ù†',
    dropzoneTitle: 'Ø§Ù¾Ù†ÛŒ ÙØ§Ø¦Ù„ÛŒÚº ÛŒÛØ§Úº ÚˆØ±ÛŒÚ¯ Ø§ÛŒÙ†Úˆ ÚˆØ±Ø§Ù¾ Ú©Ø±ÛŒÚº',
    dropzoneSubtitle: 'ÛŒØ§ Ø§Ù¾Ù†Û’ ÚˆÛŒÙˆØ§Ø¦Ø³ Ø³Û’ ÙØ§Ø¦Ù„ Ù…Ù†ØªØ®Ø¨ Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ú©Ù„Ú© Ú©Ø±ÛŒÚº',
    chooseFiles: 'ÙØ§Ø¦Ù„ÛŒÚº Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚº',
    processing: 'ÙØ§Ø¦Ù„ÛŒÚº Ù¾Ø±ÙˆØ³ÛŒØ³ ÛÙˆ Ø±ÛÛŒ ÛÛŒÚº...',
    download: 'Ù†ØªÛŒØ¬Û ÚˆØ§Ø¤Ù†Ù„ÙˆÚˆ Ú©Ø±ÛŒÚº',
    downloadAllZip: 'ØªÙ…Ø§Ù… ÙØ§Ø¦Ù„ÛŒÚº Ø²Ù¾ (ZIP) Ù…ÛŒÚº ÚˆØ§Ø¤Ù†Ù„ÙˆÚˆ Ú©Ø±ÛŒÚº',
    startAgain: 'Ø¯ÙˆØ³Ø±ÛŒ ÙØ§Ø¦Ù„ Ù¾Ø±ÙˆØ³ÛŒØ³ Ú©Ø±ÛŒÚº',
    savedPercentage: 'Ø³Ø§Ø¦Ø² Ú©ÛŒ Ø¨Ú†Øª',
    originalSize: 'Ø§ØµÙ„ Ø³Ø§Ø¦Ø²',
    compressedSize: 'Ù†ÛŒØ§ Ø³Ø§Ø¦Ø²',
    nav: {
      home: 'ÛÙˆÙ…',
      courses: 'Ú©ÙˆØ±Ø³Ø²',
      dashboard: 'ÚˆÛŒØ´ Ø¨ÙˆØ±Úˆ',
      pdfTools: 'Ù¾ÛŒ ÚˆÛŒ Ø§ÛŒÙ Ù¹ÙˆÙ„Ø²',
      imageTools: 'Ø§Ù…ÛŒØ¬ Ù¹ÙˆÙ„Ø²',
      documents: 'Ø¯Ø³ØªØ§ÙˆÛŒØ²Ø§Øª',
      textTools: 'Ù¹ÛŒÚ©Ø³Ù¹ Ù¹ÙˆÙ„Ø²',
      compress: 'Ú©Ù…Ù¾Ø±ÛŒØ³',
      ocr: 'Ø§Ùˆ Ø³ÛŒ Ø¢Ø± Ø§Ø³Ù¹ÙˆÚˆÛŒÙˆ',
      calculators: 'Ú©ÛŒÙ„Ú©ÙˆÙ„ÛŒÙ¹Ø±Ø²',
      devTools: 'ÚˆÛŒÙˆÙ„Ù¾Ø± Ù¹ÙˆÙ„Ø²',
      security: 'Ø³ÛŒÚ©ÛŒÙˆØ±Ù¹ÛŒ',
      qrBarcode: 'Ú©ÛŒÙˆ Ø¢Ø± Ùˆ Ø¨Ø§Ø±Ú©ÙˆÚˆ',
      aiTools: 'Ø§Û’ Ø¢Ø¦ÛŒ Ø§Ø³Ù¹ÙˆÚˆÛŒÙˆ',
      pdfEditor: 'Ù¾ÛŒ ÚˆÛŒ Ø§ÛŒÙ Ø§ÛŒÚˆÛŒÙ¹Ø±',
      workflows: 'ÙˆØ±Ú© ÙÙ„ÙˆØ²',
      allTools: 'ØªÙ…Ø§Ù… Ù¹ÙˆÙ„Ø²',
      quiz: 'Ú©ÙˆØ¦Ø² Ø§ÙˆØ± Ù¹ÛŒØ³Ù¹',
      myTools: 'Ù…ÛŒØ±Û’ Ù¹ÙˆÙ„Ø²',
      favorites: 'Ù¾Ø³Ù†Ø¯ÛŒØ¯Û',
      history: 'ÛØ³Ù¹Ø±ÛŒ',
      downloads: 'ÚˆØ§Ø¤Ù†Ù„ÙˆÚˆØ²',
      notifications: 'Ù†ÙˆÙ¹ÛŒÙÛŒÚ©ÛŒØ´Ù†Ø²',
      settings: 'Ø³ÛŒÙ¹Ù†Ú¯Ø²',
      admin: 'Ø§ÛŒÚˆÙ…Ù† Ú©Ù†Ù¹Ø±ÙˆÙ„ Ø³ÛŒÙ†Ù¹Ø±',
      login: 'Ù„Ø§Ú¯ Ø§Ù†',
      signup: 'Ø³Ø§Ø¦Ù† Ø§Ù¾',
      logout: 'Ù„Ø§Ú¯ Ø¢Ø¤Ù¹',
      myProfile: 'Ù…ÛŒØ±Ø§ Ù¾Ø±ÙˆÙØ§Ø¦Ù„',
    },
    courses: {
      title: 'Ù…Ø§Ø³Ù¹Ø± Ú©ÙˆØ±Ø³Ø² Ø¯Ø±ÛŒØ§ÙØª Ú©Ø±ÛŒÚº',
      subtitle: 'Ù…ÙØª Ø§ÙˆØ± Ú©Ú¾Ù„Û’ Ù„Ø±Ù†Ù†Ú¯ Ú©ÙˆØ±Ø³Ø²Û” Ù†ØµØ§Ø¨ Ú©Ø§ Ø¬Ø§Ø¦Ø²Û Ù„ÛŒÚºØŒ Ø§Ø³Ø¨Ø§Ù‚ Ú©Ø§ Ù¾Ø±ÛŒÙˆÛŒÙˆ Ø¯ÛŒÚ©Ú¾ÛŒÚº ÛŒØ§ Ù¾ÛŒØ´ Ø±ÙØª Ø§ÙˆØ± Ø³Ø±Ù¹ÛŒÙÚ©ÛŒÙ¹ Ú©Û’ Ù„ÛŒÛ’ Ø§Ù†Ø¯Ø±Ø§Ø¬ Ú©Ø±ÛŒÚºÛ”',
      browse: 'Ú©ÙˆØ±Ø³Ø² Ø¨Ø±Ø§Ø¤Ø² Ú©Ø±ÛŒÚº',
      myCourses: 'Ù…ÛŒØ±Û’ Ø±Ø¬Ø³Ù¹Ø±Úˆ Ú©ÙˆØ±Ø³Ø²',
      allCategories: 'ØªÙ…Ø§Ù… Ú©ÛŒÙ¹ÛŒÚ¯Ø±ÛŒØ²',
      freePreview: 'Ù…ÙØª Ù¾Ø±ÛŒÙˆÛŒÙˆ',
      enrollFree: 'Ù…ÙØª Ø§Ù†Ø±ÙˆÙ„ Ú©Ø±ÛŒÚº',
      enrolled: 'Ø§Ù†Ø¯Ø±Ø§Ø¬ Ø´Ø¯Û',
      continueLearning: 'Ø³ÛŒÚ©Ú¾Ù†Ø§ Ø¬Ø§Ø±ÛŒ Ø±Ú©Ú¾ÛŒÚº',
      resume: 'Ø³Ø¨Ù‚ Ø¬Ø§Ø±ÛŒ Ø±Ú©Ú¾ÛŒÚº',
      progress: 'Ú©ÙˆØ±Ø³ Ú©ÛŒ Ù¾ÛŒØ´ Ø±ÙØª',
      completed: 'Ù…Ú©Ù…Ù„ Ø´Ø¯Û',
      lessons: 'Ú©Ù„ Ø§Ø³Ø¨Ø§Ù‚',
      duration: 'Ø¯ÙˆØ±Ø§Ù†ÛŒÛ',
      instructor: 'Ø§Ø³ØªØ§Ø¯ / Ø§Ù†Ø³Ù¹Ø±Ú©Ù¹Ø±',
      curriculum: 'Ù…Ú©Ù…Ù„ Ù†ØµØ§Ø¨ Ùˆ Ø§Ø³Ø¨Ø§Ù‚',
      overview: 'Ú©ÙˆØ±Ø³ Ú©Ø§ Ø®Ù„Ø§ØµÛ',
      certificate: 'ØªÚ©Ù…ÛŒÙ„ Ú©Ø§ Ø³Ø±Ù¹ÛŒÙÚ©ÛŒÙ¹',
      certificateDesc: 'ØªÙ…Ø§Ù… Ù…Ø§ÚˆÛŒÙˆÙ„Ø² Ø§ÙˆØ± Ù¾Ø±ÙˆØ¬ÛŒÚ©Ù¹Ø³ Ù…Ú©Ù…Ù„ Ú©Ø±Ù†Û’ Ù¾Ø± ØªØµØ¯ÛŒÙ‚ Ø´Ø¯Û ÚˆÛŒØ¬ÛŒÙ¹Ù„ Ø³Ø±Ù¹ÛŒÙÚ©ÛŒÙ¹ Ø­Ø§ØµÙ„ Ú©Ø±ÛŒÚºÛ”',
      noEnrollmentRequired: 'Ú©ÙˆØ±Ø³ Ú©Ø§ Ù…ÙˆØ§Ø¯ Ù¾Ú‘Ú¾Ù†Û’ Ø§ÙˆØ± Ù¾Ø±ÛŒÙˆÛŒÙˆ Ø¯ÛŒÚ©Ú¾Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø§Ù†Ø¯Ø±Ø§Ø¬ Ù„Ø§Ø²Ù…ÛŒ Ù†ÛÛŒÚº ÛÛ’Û”',
      enrollmentBenefitsTitle: 'Ú©ÙˆØ±Ø³ Ù…ÛŒÚº Ø§Ù†Ø¯Ø±Ø§Ø¬ Ú©Û’ ÙÙˆØ§Ø¦Ø¯:',
      benefit1: 'Ø§Ù¾Ù†ÛŒ Ù¾ÛŒØ´ Ø±ÙØª Ù…Ø­ÙÙˆØ¸ Ú©Ø±ÛŒÚº Ø§ÙˆØ± Ø¬ÛØ§Úº Ø³Û’ Ú†Ú¾ÙˆÚ‘Ø§ ØªÚ¾Ø§ ÙˆÛÛŒÚº Ø³Û’ Ø´Ø±ÙˆØ¹ Ú©Ø±ÛŒÚº',
      benefit2: 'Ù…Ú©Ù…Ù„ Ø´Ø¯Û Ø§Ø³Ø¨Ø§Ù‚ Ø§ÙˆØ± Ú©Ø§Ù…ÛŒØ§Ø¨ÛŒÙˆÚº Ú©Ø§ Ù…Ú©Ù…Ù„ Ù¹Ø±ÛŒÚ© Ø±ÛŒÚ©Ø§Ø±Úˆ Ø±Ú©Ú¾ÛŒÚº',
      benefit3: 'Ø§Ù†Ù¹Ø±Ø§ÛŒÚ©Ù¹Ùˆ Ù¾Ø±ÙˆØ¬ÛŒÚ©Ù¹ ÙØ§Ø¦Ù„Ø² Ø§ÙˆØ± Ù¹ÙˆÙ„ Ù¹ÛŒÙ…Ù¾Ù„ÛŒÙ¹Ø³ ØªÚ© Ø±Ø³Ø§Ø¦ÛŒ Ø­Ø§ØµÙ„ Ú©Ø±ÛŒÚº',
      benefit4: 'Ø¨Ø±Ø§Û Ø±Ø§Ø³Øª Ø§Ù¾ ÚˆÛŒÙ¹Ø³ØŒ Ø¨ÛŒØ¬Ø² Ø§ÙˆØ± Ø³Ø±Ù¹ÛŒÙÚ©ÛŒÙ¹ Ø­Ø§ØµÙ„ Ú©Ø±ÛŒÚº',
      filterByLevel: 'Ù„ÛŒÙˆÙ„ Ú©Û’ Ù„Ø­Ø§Ø¸ Ø³Û’ ÙÙ„Ù¹Ø± Ú©Ø±ÛŒÚº',
      allLevels: 'ØªÙ…Ø§Ù… Ù„ÛŒÙˆÙ„Ø²',
      beginner: 'Ø§Ø¨ØªØ¯Ø§Ø¦ÛŒ (Beginner)',
      intermediate: 'Ø¯Ø±Ù…ÛŒØ§Ù†Û (Intermediate)',
      advanced: 'Ø§ÛŒÚˆÙˆØ§Ù†Ø³Úˆ (Advanced)',
      searchCourses: 'Ø¹Ù†ÙˆØ§Ù†ØŒ Ù…ÙˆØ¶ÙˆØ¹ ÛŒØ§ Ù¹ÛŒÚ©Ù†Ø§Ù„ÙˆØ¬ÛŒ Ø³Û’ Ú©ÙˆØ±Ø³ ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº...',
      noCoursesFound: 'Ú©ÙˆØ¦ÛŒ Ú©ÙˆØ±Ø³ Ø¢Ù¾ Ú©Û’ Ø³Ø±Ú† Ù…Ø¹ÛŒØ§Ø± Ù¾Ø± Ù¾ÙˆØ±Ø§ Ù†ÛÛŒÚº Ø§ØªØ±Ø§Û”',
      viewDetails: 'Ù†ØµØ§Ø¨ Ø¯ÛŒÚ©Ú¾ÛŒÚº',
      startCourse: 'Ø§Ø¨Ú¾ÛŒ Ø³ÛŒÚ©Ú¾Ù†Ø§ Ø´Ø±ÙˆØ¹ Ú©Ø±ÛŒÚº',
      lessonLocked: 'Ù¾ÛŒØ´ Ø±ÙØª Ù…Ø­ÙÙˆØ¸ Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø§Ù†Ø¯Ø±Ø§Ø¬ Ú©Ø±ÛŒÚº',
      lessonPreview: 'Ù…ÙØª Ù¾Ø±ÛŒÙˆÛŒÙˆ Ø¯Ø³ØªÛŒØ§Ø¨ ÛÛ’',
    },
    auth: {
      signIn: 'Ø³Ø§Ø¦Ù† Ø§Ù†',
      signUp: 'Ø³Ø§Ø¦Ù† Ø§Ù¾',
      emailAddress: 'Ø§ÛŒ Ù…ÛŒÙ„ Ø§ÛŒÚˆØ±ÛŒØ³',
      password: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ',
      fullName: 'Ù¾ÙˆØ±Ø§ Ù†Ø§Ù…',
      forgotPassword: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø¨Ú¾ÙˆÙ„ Ú¯Ø¦Û’ØŸ',
      resetPassword: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø±ÛŒ Ø³ÛŒÙ¹ Ú©Ø±ÛŒÚº',
      sendResetLink: 'Ø±ÛŒ Ø³ÛŒÙ¹ Ù„Ù†Ú© Ø¨Ú¾ÛŒØ¬ÛŒÚº',
      resetLinkSent: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø±ÛŒ Ø³ÛŒÙ¹ Ù„Ù†Ú© Ø¢Ù¾ Ú©Û’ Ø§ÛŒ Ù…ÛŒÙ„ Ù¾Ø± Ø¨Ú¾ÛŒØ¬ Ø¯ÛŒØ§ Ú¯ÛŒØ§ ÛÛ’Û”',
      rememberMe: 'Ø§Ø³ ÚˆÛŒÙˆØ§Ø¦Ø³ Ù¾Ø± Ù…Ø¬Ú¾Û’ ÛŒØ§Ø¯ Ø±Ú©Ú¾ÛŒÚº',
      showPassword: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø¯Ú©Ú¾Ø§Ø¦ÛŒÚº',
      hidePassword: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ Ú†Ú¾Ù¾Ø§Ø¦ÛŒÚº',
      continueWithGoogle: 'Ú¯ÙˆÚ¯Ù„ Ú©Û’ Ø³Ø§ØªÚ¾ Ù„Ø§Ú¯ Ø§Ù† Ú©Ø±ÛŒÚº',
      orEmail: 'ÛŒØ§ Ø§ÛŒ Ù…ÛŒÙ„ Ú©Û’ Ø°Ø±ÛŒØ¹Û’ Ø¬Ø§Ø±ÛŒ Ø±Ú©Ú¾ÛŒÚº',
      dontHaveAccount: 'Ø§Ú©Ø§Ø¤Ù†Ù¹ Ù†ÛÛŒÚº ÛÛ’ØŸ',
      alreadyHaveAccount: 'Ù¾ÛÙ„Û’ Ø³Û’ Ø§Ú©Ø§Ø¤Ù†Ù¹ Ù…ÙˆØ¬ÙˆØ¯ ÛÛ’ØŸ',
      createAccount: 'Ù…ÙØª Ø§Ú©Ø§Ø¤Ù†Ù¹ Ø¨Ù†Ø§Ø¦ÛŒÚº',
      emailVerification: 'Ø§ÛŒ Ù…ÛŒÙ„ ØªØµØ¯ÛŒÙ‚',
      emailVerified: 'ØªØµØ¯ÛŒÙ‚ Ø´Ø¯Û Ø§Ú©Ø§Ø¤Ù†Ù¹',
      emailNotVerified: 'Ø§ÛŒ Ù…ÛŒÙ„ Ø§Ø¨Ú¾ÛŒ ØªØµØ¯ÛŒÙ‚ Ø´Ø¯Û Ù†ÛÛŒÚº ÛÛ’',
      resendVerification: 'Ø¯ÙˆØ¨Ø§Ø±Û ØªØµØ¯ÛŒÙ‚ÛŒ Ø§ÛŒ Ù…ÛŒÙ„ Ø¨Ú¾ÛŒØ¬ÛŒÚº',
      verificationSent: 'ØªØµØ¯ÛŒÙ‚ÛŒ Ø§ÛŒ Ù…ÛŒÙ„ Ø¨Ú¾ÛŒØ¬ Ø¯ÛŒ Ú¯Ø¦ÛŒ Û Û’! Ø§Ù¾Ù†Ø§ Ø§Ù† Ø¨Ø§Ú©Ø³ Ú†ÛŒÚ© Ú©Ø±ÛŒÚºÛ”',
      invalidCredentials: 'Ø§ÛŒ Ù…ÛŒÙ„ ÛŒØ§ Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø¯Ø±Ø³Øª Ù†Û ÛŒÚº Û Û’Û” Ø¯ÙˆØ¨Ø§Ø±Û  Ú†ÛŒÚ© Ú©Ø±ÛŒÚºÛ”',
      accountCreatedSuccess: 'Ø§Ú©Ø§Ø¤Ù†Ù¹ Ú©Ø§Ù…ÛŒØ§Ø¨ÛŒ Ø³Û’ Ø¨Ù† Ú¯ÛŒØ§! Ù†ÛŒÚ©Ø³ÙˆØ±Ø§ Ù¾Ø±Ùˆ Ù…ÛŒÚº Ø®ÙˆØ´ Ø¢Ù…Ø¯ÛŒØ¯Û”',
      loginSuccess: 'Ú©Ø§Ù…ÛŒØ§Ø¨ÛŒ Ø³Û’ Ù„Ø§Ú¯ Ø§Ù† Û Ùˆ Ú¯Ø¦Û’!',
      logoutSuccess: 'Ù…Ø­Ù ÙˆØ¸ Ø·Ø±ÛŒÙ‚Û’ Ø³Û’ Ù„Ø§Ú¯ Ø¢Ø¤Ù¹ Û Ùˆ Ú¯Ø¦Û’Û”',
      passwordMinLength: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ Ú©Ù… Ø§Ø² Ú©Ù… 6 Ø­Ø±ÙˆÙ  Ù¾Ø± Ù…Ø´ØªÙ…Ù„ Û ÙˆÙ†Ø§ Ú†Ø§Û ÛŒÛ’Û”',
      enterEmailPassword: 'Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ø§ÛŒ Ù…ÛŒÙ„ Ø§ÙˆØ± Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø¯ÙˆÙ†ÙˆÚº Ø¯Ø±Ø¬ Ú©Ø±ÛŒÚºÛ”',
      enterAllFields: 'Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ø§Ù¾Ù†Ø§ Ù¾ÙˆØ±Ø§ Ù†Ø§Ù…ØŒ Ø§ÛŒ Ù…ÛŒÙ„ Ø§ÙˆØ± Ù¾Ø§Ø³ ÙˆØ±Úˆ Ø¯Ø±Ø¬ Ú©Ø±ÛŒÚºÛ”',
      registrationFailed: 'Ø±Ø¬Ø³Ù¹Ø±ÛŒØ´Ù† Ù†Ø§Ú©Ø§Ù… Û ÙˆÚ¯Ø¦ÛŒÛ” Ø¨Ø±Ø§Û  Ú©Ø±Ù… Ø¯ÙˆØ¨Ø§Ø±Û  Ú©ÙˆØ´Ø´ Ú©Ø±ÛŒÚºÛ”',
      enterEmailForReset: 'Ø±ÛŒ Ø³ÛŒÙ¹ Ù„Ù†Ú© Ø­Ø§ØµÙ„ Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø§Ù¾Ù†Ø§ Ø§ÛŒ Ù…ÛŒÙ„ Ø¯Ø±Ø¬ Ú©Ø±ÛŒÚºÛ”',
      authSubtitle: 'Ø®Ø§Ù„ØµØªØ§Ù‹ Ú©Ù„Ø§Ø¦Ù†Ù¹ Ø³Ø§Ø¦ÛŒÚˆ Ù…Ø­Ù ÙˆØ¸ ØªØµØ¯ÛŒÙ‚',
    },
    userDashboard: {
      welcomeBack: 'Ø®ÙˆØ´ Ø¢Ù…Ø¯ÛŒØ¯',
      overview: 'Ø§Ú©Ø§Ø¤Ù†Ù¹ Ú©Ø§ Ø®Ù„Ø§ØµÛ ',
      myToolsTitle: 'Ù…ÛŒØ±Û’ Ù¹ÙˆÙ„Ø² Ùˆ Ø´Ø§Ø±Ù¹ Ú©Ù¹Ø³',
      myToolsSubtitle: 'Ø§Ù¾Ù†Û’ Ú©Ø«Ø±Øª Ø³Û’ Ø§Ø³ØªØ¹Ù…Ø§Ù„ ÛÙˆÙ†Û’ ÙˆØ§Ù„Û’ Ø§ÙˆØ± Ù¾Ù† Ú©ÛŒÛ’ Ú¯Ø¦Û’ Ù¹ÙˆÙ„Ø² ØªÚ© ÙÙˆØ±ÛŒ Ø±Ø³Ø§Ø¦ÛŒÛ”',
      favoritesTitle: 'Ù¾Ø³Ù†Ø¯ÛŒØ¯Û Ø¨Ú© Ù…Ø§Ø±Ú©Ø³',
      favoritesSubtitle: 'Ø¢Ù¾ Ú©Û’ Ù…Ø­ÙÙˆØ¸ Ú©Ø±Ø¯Û Ù¹ÙˆÙ„Ø² Ø§ÙˆØ± Ù¾Ø³Ù†Ø¯ÛŒØ¯Û Ú©ÙˆØ±Ø³Ø² Ú©ÛŒ Ù„Ø³Ù¹Û”',
      historyTitle: 'Ø³Ø±Ú¯Ø±Ù…ÛŒ Ø§ÙˆØ± ÛØ³Ù¹Ø±ÛŒ',
      historySubtitle: 'Ø­Ø§Ù„ÛŒÛ Ù¾Ø±ÙˆØ³ÛŒØ³ Ø´Ø¯Û ÙØ§Ø¦Ù„ÛŒÚºØŒ Ú©Ú¾Ù„Û’ Ú¯Ø¦Û’ Ù¹ÙˆÙ„Ø² Ø§ÙˆØ± Ù¾Ú‘Ú¾Û’ Ú¯Ø¦Û’ Ø§Ø³Ø¨Ø§Ù‚Û”',
      downloadsTitle: 'ÚˆØ§Ø¤Ù†Ù„ÙˆÚˆØ² Ø§ÙˆØ± ÙØ§Ø¦Ù„Ø²',
      downloadsSubtitle: 'Ø§Ù¾Ù†ÛŒ ØªÛŒØ§Ø± Ú©Ø±Ø¯Û Ù¾ÛŒ ÚˆÛŒ Ø§ÛŒÙØŒ ØªØµØ§ÙˆÛŒØ± Ø§ÙˆØ± Ú©Ù†ÙˆØ±Ù¹ Ø´Ø¯Û ÙØ§Ø¦Ù„ÛŒÚº Ø¯ÙˆØ¨Ø§Ø±Û Ø­Ø§ØµÙ„ Ú©Ø±ÛŒÚºÛ”',
      notificationsTitle: 'Ù†ÙˆÙ¹ÛŒÙÛŒÚ©ÛŒØ´Ù† Ø³ÛŒÙ†Ù¹Ø±',
      notificationsSubtitle: 'Ù†Ø¦Û’ Ú©ÙˆØ±Ø³Ø²ØŒ Ù¹ÙˆÙ„ Ø§Ù¾ ÚˆÛŒÙ¹Ø³ Ø§ÙˆØ± Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ø§Ø¹Ù„Ø§Ù†Ø§Øª Ø³Û’ Ø¨Ø§Ø®Ø¨Ø± Ø±ÛÛŒÚºÛ”',
      settingsTitle: 'ØªØ±Ø¬ÛŒØ­Ø§Øª Ùˆ Ø³ÛŒÙ¹Ù†Ú¯Ø²',
      settingsSubtitle: 'ØªÚ¾ÛŒÙ…ØŒ Ø²Ø¨Ø§Ù†ØŒ Ù†ÙˆÙ¹ÛŒÙÛŒÚ©ÛŒØ´Ù†Ø² Ø§ÙˆØ± Ø³ÛŒÚ©ÛŒÙˆØ±Ù¹ÛŒ Ú©Ùˆ Ø§Ù¾Ù†ÛŒ Ù…Ø±Ø¶ÛŒ Ú©Û’ Ù…Ø·Ø§Ø¨Ù‚ Ø¨Ù†Ø§Ø¦ÛŒÚºÛ”',
      profileTitle: 'Ù¾Ø±ÙˆÙØ§Ø¦Ù„ Ú©ÛŒ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª',
      bioPlaceholder: 'Ø§Ù¾Ù†Û’ Ø¨Ø§Ø±Û’ Ù…ÛŒÚº ÛŒØ§ Ø§Ù¾Ù†ÛŒ Ù…ÛØ§Ø±ØªÙˆÚº Ú©Û’ Ø¨Ø§Ø±Û’ Ù…ÛŒÚº Ù…Ø®ØªØµØ± Ù„Ú©Ú¾ÛŒÚº...',
      saveProfile: 'ØªØ¨Ø¯ÛŒÙ„ÛŒØ§Úº Ù…Ø­ÙÙˆØ¸ Ú©Ø±ÛŒÚº',
      profileUpdated: 'Ù¾Ø±ÙˆÙØ§Ø¦Ù„ Ú©Ø§Ù…ÛŒØ§Ø¨ÛŒ Ø³Û’ Ø§Ù¾ ÚˆÛŒÙ¹ ÛÙˆ Ú¯ÛŒØ§!',
      joinedOn: 'Ø±Ú©Ù†ÛŒØª Ú©ÛŒ ØªØ§Ø±ÛŒØ®',
      accountStatus: 'Ø§Ú©Ø§Ø¤Ù†Ù¹ Ø§Ø³Ù¹ÛŒÙ¹Ø³',
      verified: 'ØªØµØ¯ÛŒÙ‚ Ø´Ø¯Û',
      unverified: 'ØºÛŒØ± ØªØµØ¯ÛŒÙ‚ Ø´Ø¯Û',
      clearHistory: 'ØªÙ…Ø§Ù… ÛØ³Ù¹Ø±ÛŒ ØµØ§Ù Ú©Ø±ÛŒÚº',
      clearAll: 'ØªÙ…Ø§Ù… ØµØ§Ù Ú©Ø±ÛŒÚº',
      noHistory: 'Ø§Ø¨Ú¾ÛŒ Ú©ÙˆØ¦ÛŒ Ø³Ø±Ú¯Ø±Ù…ÛŒ Ø±ÛŒÚ©Ø§Ø±Úˆ Ù†ÛÛŒÚº ÛÙˆØ¦ÛŒÛ” Ù¹ÙˆÙ„Ø² Ø§ÙˆØ± Ú©ÙˆØ±Ø³Ø² Ø§ÛŒÚ©Ø³Ù¾Ù„ÙˆØ± Ú©Ø±ÛŒÚº!',
      noFavorites: 'Ú©ÙˆØ¦ÛŒ Ù¾Ø³Ù†Ø¯ÛŒØ¯Û Ø¢Ø¦Ù¹Ù… Ù…Ø­ÙÙˆØ¸ Ù†ÛÛŒÚº ÛÛ’Û” Ú©Ø³ÛŒ Ø¨Ú¾ÛŒ Ù¹ÙˆÙ„ ÛŒØ§ Ú©ÙˆØ±Ø³ Ù¾Ø± Ø³ØªØ§Ø±Û’ Ú©Ø§ Ù†Ø´Ø§Ù† Ø¯Ø¨Ø§Ø¦ÛŒÚºÛ”',
      noDownloads: 'Ú©ÙˆØ¦ÛŒ ÙØ§Ø¦Ù„ ÚˆØ§Ø¤Ù†Ù„ÙˆÚˆ Ù†ÛÛŒÚº ÛÙˆØ¦ÛŒÛ” Ú©Ø³ÛŒ Ù¹ÙˆÙ„ Ù¾Ø± Ú©Ø§Ù… Ú©Ø± Ú©Û’ ÙØ§Ø¦Ù„ Ø­Ø§ØµÙ„ Ú©Ø±ÛŒÚºÛ”',
      noNotifications: 'Ø¢Ù¾ Ú©Û’ Ù¾Ø§Ø³ Ú©ÙˆØ¦ÛŒ Ù†ÛŒØ§ Ù†ÙˆÙ¹ÛŒÙÛŒÚ©ÛŒØ´Ù† Ù†ÛÛŒÚº ÛÛ’Û”',
      markAllAsRead: 'Ø³Ø¨ Ù¾Ú‘Ú¾Û’ ÛÙˆØ¦Û’ Ù†Ø´Ø§Ù† Ø²Ø¯ Ú©Ø±ÛŒÚº',
      downloadAgain: 'Ø¯ÙˆØ¨Ø§Ø±Û ÚˆØ§Ø¤Ù†Ù„ÙˆÚˆ Ú©Ø±ÛŒÚº',
      deleteItem: 'Ø­Ø°Ù Ú©Ø±ÛŒÚº',
      changePassword: 'Ø§Ú©Ø§Ø¤Ù†Ù¹ Ù¾Ø§Ø³ ÙˆØ±Úˆ ØªØ¨Ø¯ÛŒÙ„ Ú©Ø±ÛŒÚº',
      currentPassword: 'Ù…ÙˆØ¬ÙˆØ¯Û Ù¾Ø§Ø³ ÙˆØ±Úˆ',
      newPassword: 'Ù†ÛŒØ§ Ù¾Ø§Ø³ ÙˆØ±Úˆ',
      confirmNewPassword: 'Ù†Ø¦Û’ Ù¾Ø§Ø³ ÙˆØ±Úˆ Ú©ÛŒ ØªØµØ¯ÛŒÙ‚ Ú©Ø±ÛŒÚº',
      updatePasswordBtn: 'Ù¾Ø§Ø³ ÙˆØ±Úˆ ØªØ¨Ø¯ÛŒÙ„ Ú©Ø±ÛŒÚº',
    },
    settings: {
      accountTab: 'Ø§Ú©Ø§Ø¤Ù†Ù¹',
      appearanceTab: 'Ø¸Ø§ÛØ±ÛŒ Ø´Ú©Ù„ (ØªÚ¾ÛŒÙ…)',
      languageTab: 'Ø²Ø¨Ø§Ù†',
      notificationsTab: 'Ù†ÙˆÙ¹ÛŒÙÛŒÚ©ÛŒØ´Ù†Ø²',
      privacyTab: 'Ù¾Ø±Ø§Ø¦ÛŒÙˆÛŒØ³ÛŒ',
      securityTab: 'Ø³ÛŒÚ©ÛŒÙˆØ±Ù¹ÛŒ',
      themeMode: 'ØªÚ¾ÛŒÙ… Ú©Ø§ Ø§Ù†ØªØ®Ø§Ø¨',
      lightTheme: 'Ù„Ø§Ø¦Ù¹ Ù…ÙˆÚˆ',
      darkTheme: 'ÚˆØ§Ø±Ú© Ù…ÙˆÚˆ',
      systemTheme: 'Ø³Ø³Ù¹Ù… ÚˆÛŒÙØ§Ù„Ù¹',
      selectLanguage: 'Ø§ÛŒÙ¾ Ú©ÛŒ Ø²Ø¨Ø§Ù† Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚº',
      emailNotifications: 'Ø§ÛŒ Ù…ÛŒÙ„ Ù†ÙˆÙ¹ÛŒÙÛŒÚ©ÛŒØ´Ù†Ø²',
      courseUpdates: 'Ú©ÙˆØ±Ø³Ø² Ø§ÙˆØ± Ù†ØµØ§Ø¨ Ú©ÛŒ Ø§Ù¾ ÚˆÛŒÙ¹Ø³',
      toolAlerts: 'Ù†Ø¦Û’ Ù¹ÙˆÙ„Ø² Ø§ÙˆØ± Ø§Ù¾ Ú¯Ø±ÛŒÚˆØ² Ú©Û’ Ø§Ù„Ø±Ù¹Ø³',
      securityAlerts: 'Ø§Ú©Ø§Ø¤Ù†Ù¹ Ø§ÙˆØ± Ø³ÛŒÚ©ÛŒÙˆØ±Ù¹ÛŒ Ø§Ù„Ø±Ù¹Ø³',
      marketingAnnouncements: 'Ù¾Ø±ÙˆÚˆÚ©Ù¹ Ù†ÛŒÙˆØ² Ø§ÙˆØ± Ø§ÛÙ… Ù¹Ù¾Ø³',
      dataStorage: 'Ù„ÙˆÚ©Ù„ ÚˆÛŒÙ¹Ø§ Ø§ÙˆØ± Ú©ÛŒØ´Û’',
      localStorageNotice: 'Ù†ÛŒÚ©Ø³ÙˆØ±Ø§ Ø¢Ù¾ Ú©ÛŒ ØªØ±Ø¬ÛŒØ­Ø§Øª Ø§ÙˆØ± ÛØ³Ù¹Ø±ÛŒ Ú©Ùˆ Ø¢Ù¾ Ú©Û’ Ø§Ù¾Ù†Û’ ÚˆÛŒÙˆØ§Ø¦Ø³ Ù¾Ø± Ù…Ø­ÙÙˆØ¸ Ø±Ú©Ú¾ØªØ§ ÛÛ’Û”',
      clearCache: 'Ù„ÙˆÚ©Ù„ Ú©ÛŒØ´Û’ ØµØ§Ù Ú©Ø±ÛŒÚº',
      cacheCleared: 'Ù„ÙˆÚ©Ù„ Ú©ÛŒØ´Û’ Ú©Ø§Ù…ÛŒØ§Ø¨ÛŒ Ø³Û’ ØµØ§Ù ÛÙˆ Ú¯ÛŒØ§Û”',
    },
    admin: {
      controlCenter: 'Ù†ÛŒÚ©Ø³ÙˆØ±Ø§ Ø§ÛŒÚˆÙ…Ù† Ú©Ù†Ù¹Ø±ÙˆÙ„ Ø³ÛŒÙ†Ù¹Ø±',
      analytics: 'Ø§ÛŒÙ†Ø§Ù„ÛŒÙ¹Ú©Ø³ Ùˆ Ù¹ÛŒÙ„ÛŒ Ù…ÛŒÙ¹Ø±ÛŒ',
      userManagement: 'ÛŒÙˆØ²Ø± Ù…ÛŒÙ†Ø¬Ù…Ù†Ù¹',
      courseManagement: 'Ú©ÙˆØ±Ø³ Ù…ÛŒÙ†Ø¬Ù…Ù†Ù¹',
      toolsManagement: 'Ù¹ÙˆÙ„Ø² Ú©Ù†Ù¹Ø±ÙˆÙ„',
      contentManager: 'Ù…ÙˆØ§Ø¯ Ùˆ ØªØ±Ø§Ø¬Ù…',
      systemSettings: 'Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ø³ÛŒÙ¹Ù†Ú¯Ø²',
      totalUsers: 'Ú©Ù„ Ø±Ø¬Ø³Ù¹Ø±Úˆ ÛŒÙˆØ²Ø±Ø²',
      activeUsers: 'ÙØ¹Ø§Ù„ Ø³ÛŒØ´Ù†Ø²',
      totalCourses: 'Ø´Ø§Ø¦Ø¹ Ø´Ø¯Û Ú©ÙˆØ±Ø³Ø²',
      totalToolRuns: 'Ú©Ù„ Ù¹ÙˆÙ„ Ø§ÛŒÚ¯Ø²ÛŒÚ©ÛŒÙˆØ´Ù†Ø²',
      systemHealth: 'Ø³Ø³Ù¹Ù… ÛÛŒÙ„ØªÚ¾ Ùˆ Ø³Ø±ÙˆØ± Ø§Ø³Ù¹ÛŒÙ¹Ø³',
      addCourse: 'Ù†ÛŒØ§ Ú©ÙˆØ±Ø³ Ø¨Ù†Ø§Ø¦ÛŒÚº',
      editCourse: 'Ú©ÙˆØ±Ø³ Ù…ÛŒÚº ØªØ±Ù…ÛŒÙ… Ú©Ø±ÛŒÚº',
      deleteCourse: 'Ú©ÙˆØ±Ø³ ÚˆÛŒÙ„ÛŒÙ¹ Ú©Ø±ÛŒÚº',
      publishCourse: 'Ø´Ø§Ø¦Ø¹ Ú©Ø±ÛŒÚº',
      draftCourse: 'ÚˆØ±Ø§ÙÙ¹ Ø±Ú©Ú¾ÛŒÚº',
      enableTool: 'Ù¹ÙˆÙ„ Ø¢Ù† Ú©Ø±ÛŒÚº',
      disableTool: 'Ù¹ÙˆÙ„ Ø¨Ù†Ø¯ Ú©Ø±ÛŒÚº',
      searchUsers: 'Ù†Ø§Ù…ØŒ Ø§ÛŒ Ù…ÛŒÙ„ ÛŒØ§ Ø±ÙˆÙ„ Ø³Û’ ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº...',
      roleAdmin: 'Ø§ÛŒÚˆÙ…Ù†Ø³Ù¹Ø±ÛŒÙ¹Ø±',
      roleUser: 'Ø¹Ø§Ù… ÛŒÙˆØ²Ø±',
      makeAdmin: 'Ø§ÛŒÚˆÙ…Ù† Ø¨Ù†Ø§Ø¦ÛŒÚº',
      removeAdmin: 'Ø¹Ø§Ù… ÛŒÙˆØ²Ø± Ø¨Ù†Ø§Ø¦ÛŒÚº',
      maintenanceMode: 'Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ù…ÛŒÙ†Ù¹ÛŒÙ†Ù†Ø³ Ù…ÙˆÚˆ',
      allowRegistration: 'Ù†Ø¦Û’ Ø³Ø§Ø¦Ù† Ø§Ù¾ Ú©ÛŒ Ø§Ø¬Ø§Ø²Øª Ø¯ÛŒÚº',
    },
    footer: {
      desc: 'Ù†ÛŒÚ©Ø³ÙˆØ±Ø§ Ù¾Ø±Ùˆ Ø§ÛŒÚ© Ø¬Ø§Ù…Ø¹ ÚˆÛŒØ¬ÛŒÙ¹Ù„ Ø§ÛŒÚ©Ùˆ Ø³Ø³Ù¹Ù… ÛÛ’ Ø¬Ùˆ Ø¨ØºÛŒØ± Ø³Ø±ÙˆØ± Ø§Ù¾Ù„ÙˆÚˆ Ú©Û’ Ù…ÙØª Ú©Ù„Ø§Ø¦Ù†Ù¹ Ø³Ø§Ø¦ÛŒÚˆ Ù¹ÙˆÙ„Ø² Ø§ÙˆØ± Ù¾ÛŒØ´Û ÙˆØ±Ø§Ù†Û ÚˆÛŒØ¬ÛŒÙ¹Ù„ Ø§Ø³Ú©Ù„ Ú©ÙˆØ±Ø³Ø² ÙØ±Ø§ÛÙ… Ú©Ø±ØªØ§ ÛÛ’Û”',
      quickLinks: 'ÙÙˆØ±ÛŒ Ø±ÙˆØ§Ø¨Ø·',
      aboutPlatform: 'Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ú©Ø§ ØªØ¹Ø§Ø±Ù',
      courses: 'ØªÙ…Ø§Ù… Ú©ÙˆØ±Ø³Ø²',
      tools: 'ØªÙ…Ø§Ù… 220+ Ù¹ÙˆÙ„Ø²',
      features: 'Ø§ÛÙ… Ø®ØµÙˆØµÛŒØ§Øª',
      helpSupport: 'Ù…Ø¯Ø¯ Ùˆ Ø³Ù¾ÙˆØ±Ù¹',
      contactUs: 'ÛÙ… Ø³Û’ Ø±Ø§Ø¨Ø·Û Ú©Ø±ÛŒÚº',
      privacyPolicy: 'Ù¾Ø±Ø§Ø¦ÛŒÙˆÛŒØ³ÛŒ Ù¾Ø§Ù„ÛŒØ³ÛŒ',
      terms: 'Ø´Ø±Ø§Ø¦Ø· Ùˆ Ø¶ÙˆØ§Ø¨Ø·',
      refundPolicy: 'Ø±ÛŒÙÙ†Úˆ Ù¾Ø§Ù„ÛŒØ³ÛŒ',
      disclaimer: 'Ù‚Ø§Ù†ÙˆÙ†ÛŒ ÚˆØ³Ú©Ù„ÛŒÙ…Ø±',
      faq: 'Ø¹Ù…ÙˆÙ…ÛŒ Ø³ÙˆØ§Ù„Ø§Øª (FAQ)',
      userGuidelines: 'ØµØ§Ø±ÙÛŒÙ† Ú©ÛŒ Ø±ÛÙ†Ù…Ø§Ø¦ÛŒ',
      rights: 'Ø¬Ù…Ù„Û Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸ ÛÛŒÚºÛ”',
      poweredBy: '100% Ù¾Ø±Ø§Ø¦ÛŒÙˆÛŒÙ¹ Ú©Ù„Ø§Ø¦Ù†Ù¹ Ø³Ø§Ø¦ÛŒÚˆ Ù¾Ø±ÙˆØ³ÛŒØ³Ù†Ú¯ Ø§Ù†Ø¬Ù†Û”',
      clientSideSecurity: 'Ø¢Ù¾ Ú©ÛŒ ÙØ§Ø¦Ù„ÛŒÚº Ú©Ø¨Ú¾ÛŒ Ø¨Ú¾ÛŒ Ú©Ø³ÛŒ Ø¨ÛŒØ±ÙˆÙ†ÛŒ Ø³Ø±ÙˆØ± Ù¾Ø± Ø§Ù¾Ù„ÙˆÚˆ ÛŒØ§ Ù…Ø­ÙÙˆØ¸ Ù†ÛÛŒÚº ÛÙˆØªÛŒÚºÛ”',
    },
    common: {
      save: 'Ù…Ø­ÙÙˆØ¸ Ú©Ø±ÛŒÚº',
      cancel: 'Ù…Ù†Ø³ÙˆØ® Ú©Ø±ÛŒÚº',
      delete: 'ÚˆÛŒÙ„ÛŒÙ¹ Ú©Ø±ÛŒÚº',
      edit: 'ØªØ±Ù…ÛŒÙ… Ú©Ø±ÛŒÚº',
      remove: 'ÛÙ¹Ø§Ø¦ÛŒÚº',
      open: 'Ú©Ú¾ÙˆÙ„ÛŒÚº',
      close: 'Ø¨Ù†Ø¯ Ú©Ø±ÛŒÚº',
      back: 'Ù¾ÛŒÚ†Ú¾Û’',
      next: 'Ø§Ú¯Ù„Ø§',
      finish: 'Ù…Ú©Ù…Ù„',
      confirm: 'ØªØµØ¯ÛŒÙ‚ Ú©Ø±ÛŒÚº',
      loading: 'Ù„ÙˆÚˆ ÛÙˆ Ø±ÛØ§ ÛÛ’...',
      success: 'Ú©Ø§Ù…ÛŒØ§Ø¨ÛŒ',
      error: 'Ø®Ø±Ø§Ø¨ÛŒ',
      all: 'ØªÙ…Ø§Ù…',
      free: 'Ù…ÙØª',
      pro: 'Ù¾Ø±Ùˆ',
      enterprise: 'Ø§Ù†Ù¹Ø±Ù¾Ø±Ø§Ø¦Ø²',
      filter: 'ÙÙ„Ù¹Ø±',
      search: 'ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº',
      viewAll: 'ØªÙ…Ø§Ù… Ø¯ÛŒÚ©Ú¾ÛŒÚº',
      noData: 'Ú©ÙˆØ¦ÛŒ ÚˆÛŒÙ¹Ø§ Ø¯Ø³ØªÛŒØ§Ø¨ Ù†ÛÛŒÚº ÛÛ’',
      fileSize: 'ÙØ§Ø¦Ù„ Ø³Ø§Ø¦Ø²',
      date: 'ØªØ§Ø±ÛŒØ®',
      status: 'Ø­ÛŒØ«ÛŒØª',
      action: 'Ø¹Ù…Ù„',
    },
    quiz: {
      title: 'Ù…ÛØ§Ø±Øª Ùˆ Ø¹Ù„Ù… Ú©ÛŒ Ø¬Ø§Ù†Ú† (Ú©ÙˆØ¦Ø²)',
      subtitle: 'ÙÙ„ Ø§Ø³Ù¹ÛŒÚ© ÙˆÛŒØ¨ ÚˆÛŒÙˆÙ„Ù¾Ù…Ù†Ù¹ØŒ Ù¾Ø§Ø¦ØªÚ¾ÙˆÙ† Ø§Û’ Ø¢Ø¦ÛŒ Ø§ÙˆØ± Ø¯Ø³ØªØ§ÙˆÛŒØ²Ø§Øª Ú©ÛŒ Ù…ÛØ§Ø±Øª Ú©ÛŒ Ø§Ù†Ù¹Ø±Ø§ÛŒÚ©Ù¹Ùˆ Ø¬Ø§Ù†Ú† Ú©Ø±ÛŒÚºÛ”',
      startQuiz: 'Ù¹ÛŒØ³Ù¹ Ø´Ø±ÙˆØ¹ Ú©Ø±ÛŒÚº',
      nextQuestion: 'Ø§Ú¯Ù„Ø§ Ø³ÙˆØ§Ù„',
      prevQuestion: 'Ù¾Ú†Ú¾Ù„Ø§ Ø³ÙˆØ§Ù„',
      submitQuiz: 'Ù†ØªØ§Ø¦Ø¬ Ø¯ÛŒÚ©Ú¾ÛŒÚº',
      score: 'Ø¢Ù¾ Ú©Ø§ Ø§Ø³Ú©ÙˆØ±',
      passed: 'Ù…Ø¨Ø§Ø±Ú© ÛÙˆ! Ø¢Ù¾ Ú©Ø§Ù…ÛŒØ§Ø¨ ÛÙˆ Ú¯Ø¦Û’ ðŸŽ‰',
      failed: 'Ø¯ÙˆØ¨Ø§Ø±Û Ù…Ø´Ù‚ Ú©Ø±ÛŒÚº',
      retake: 'Ø¯ÙˆØ¨Ø§Ø±Û Ù¹ÛŒØ³Ù¹ Ø¯ÛŒÚº',
      explanation: 'ÙˆØ¶Ø§Ø­Øª Ø§ÙˆØ± Ø§ÛÙ… Ù†Ú©ØªÛ',
      question: 'Ø³ÙˆØ§Ù„',
      of: 'Ø§Ø²',
      correctAnswer: 'Ø¯Ø±Ø³Øª Ø¬ÙˆØ§Ø¨',
      yourAnswer: 'Ø¢Ù¾ Ú©Ø§ Ø¬ÙˆØ§Ø¨',
      congratulations: 'Ø¨ÛØª Ø®ÙˆØ¨! Ø¢Ù¾ Ù†Û’ Ø´Ø§Ù†Ø¯Ø§Ø± Ù…ÛØ§Ø±Øª Ú©Ø§ Ù…Ø¸Ø§ÛØ±Û Ú©ÛŒØ§Û”',
      tryAgain: 'Ø§Ø³Ø¨Ø§Ù‚ Ú©Ø§ Ø¯ÙˆØ¨Ø§Ø±Û Ø¬Ø§Ø¦Ø²Û Ù„ÛŒÚº Ø§ÙˆØ± Ø§Ù¾Ù†Ø§ Ø§Ø³Ú©ÙˆØ± Ø¨ÛØªØ± Ø¨Ù†Ø§Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø¯ÙˆØ¨Ø§Ø±Û Ú©ÙˆØ´Ø´ Ú©Ø±ÛŒÚºÛ”',
      selectQuiz: 'Ú©ÙˆØ¦Ø² Ú©Ø§ Ù…ÙˆØ¶ÙˆØ¹ Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚº',
    },
    dialogs: {
      confirmTitle: 'Ø¹Ù…Ù„ Ú©ÛŒ ØªØµØ¯ÛŒÙ‚ Ú©Ø±ÛŒÚº',
      confirmMessage: 'Ú©ÛŒØ§ Ø¢Ù¾ ÙˆØ§Ù‚Ø¹ÛŒ Ø§Ø³ Ú©Ø§Ø±Ø±ÙˆØ§Ø¦ÛŒ Ú©Ùˆ Ø¬Ø§Ø±ÛŒ Ø±Ú©Ú¾Ù†Ø§ Ú†Ø§ÛØªÛ’ ÛÛŒÚºØŸ',
      deleteConfirmation: 'ÛŒÛ Ø¢Ø¦Ù¹Ù… Ø¢Ù¾ Ú©Û’ ÙˆØ±Ú© Ø§Ø³Ù¾ÛŒØ³ Ø³Û’ Ù…Ø³ØªÙ‚Ù„ Ø·ÙˆØ± Ù¾Ø± Ø­Ø°Ù ÛÙˆ Ø¬Ø§Ø¦Û’ Ú¯Ø§Û”',
      saveChanges: 'ØªØ¨Ø¯ÛŒÙ„ÛŒØ§Úº Ù…Ø­ÙÙˆØ¸ Ú©Ø±ÛŒÚº',
      discardChanges: 'Ù…Ù†Ø³ÙˆØ® Ú©Ø±ÛŒÚº',
      searchModalTitle: 'Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù… Ú¯Ù„ÙˆØ¨Ù„ Ø³Ø±Ú†',
      searchModalPlaceholder: '220+ Ù¹ÙˆÙ„Ø²ØŒ Ú©ÙˆØ±Ø³Ø²ØŒ Ø§Ø³Ø¨Ø§Ù‚ Ø§ÙˆØ± ÙˆØ±Ú© ÙÙ„ÙˆØ² ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº...',
    },
    errors: {
      general: 'Ø§ÛŒÚ© ØºÛŒØ± Ù…ØªÙˆÙ‚Ø¹ Ù…Ø³Ø¦Ù„Û Ù¾ÛŒØ´ Ø¢ÛŒØ§ ÛÛ’Û” Ø¨Ø±Ø§Û Ú©Ø±Ù… Ø¯ÙˆØ¨Ø§Ø±Û Ú©ÙˆØ´Ø´ Ú©Ø±ÛŒÚºÛ”',
      notFound: 'Ø¯Ø±Ø®ÙˆØ§Ø³Øª Ú©Ø±Ø¯Û ØµÙØ­Û ÛŒØ§ ÙˆØ³ÛŒÙ„Û Ø¯Ø³ØªÛŒØ§Ø¨ Ù†ÛÛŒÚº ÛÛ’Û”',
      unauthorized: 'Ø§Ø³ ÙÛŒÚ†Ø± ØªÚ© Ø±Ø³Ø§Ø¦ÛŒ Ú©Û’ Ù„ÛŒÛ’ Ø¢Ù¾ Ú©Ø§ Ù„Ø§Ú¯ Ø§Ù† ÛÙˆÙ†Ø§ Ø¶Ø±ÙˆØ±ÛŒ ÛÛ’Û”',
      fileTooLarge: 'Ù…Ù†ØªØ®Ø¨ Ú©Ø±Ø¯Û ÙØ§Ø¦Ù„ 500MB Ú©ÛŒ Ú©Ù„Ø§Ø¦Ù†Ù¹ Ø³Ø§Ø¦ÛŒÚˆ Ø­Ø¯ Ø³Û’ Ø¨Ú‘ÛŒ ÛÛ’Û”',
      invalidFileType: 'Ù†Ø§Ù‚Ø§Ø¨Ù„ Ù‚Ø¨ÙˆÙ„ ÙØ§Ø¦Ù„ ÙØ§Ø±Ù…ÛŒÙ¹Û” Ø¯Ø±Ø³Øª Ø¯Ø³ØªØ§ÙˆÛŒØ² ÛŒØ§ ØªØµÙˆÛŒØ± Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚºÛ”',
      networkError: 'Ø§Ù†Ù¹Ø±Ù†ÛŒÙ¹ Ú©Ù†Ú©Ø´Ù† Ù…ÛŒÚº Ø®Ø±Ø§Ø¨ÛŒ ÛÛ’Û” Ø¨Ø±Ø§Û Ú©Ø±Ù… Ø§Ù¾Ù†Ø§ Ø±Ø§Ø¨Ø·Û Ú†ÛŒÚ© Ú©Ø±ÛŒÚºÛ”',
      tryAgainLater: 'ÙˆÙ‚Øª Ø®ØªÙ… ÛÙˆ Ú¯ÛŒØ§Û” Ú©Ú†Ú¾ Ù„Ù…Ø­Û’ Ø¨Ø¹Ø¯ Ø¯ÙˆØ¨Ø§Ø±Û Ú©ÙˆØ´Ø´ Ú©Ø±ÛŒÚºÛ”',
    },
  },

  // ==================== ARABIC (Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©) ====================
  ar: {
    appName: 'Ù†ÙŠÙƒØ³ÙˆØ±Ø§ Ø¨Ø±Ùˆ',
    tagline: 'Ù…Ù†ØµØ© Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù‚ÙˆÙŠØ© ÙˆØ§Ù„ØªØ¹Ù„ÙŠÙ… Ø§Ù„Ø±Ù‚Ù…ÙŠ Ù„ÙƒÙ„ Ù…Ù„Ù ÙˆÙ…Ù‡Ù…Ø© Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©.',
    heroTitle: 'ØªØ¹Ù„Ù… Ø§Ù„Ù…Ù‡Ø§Ø±Ø§Øª Ø§Ù„Ø±Ù‚Ù…ÙŠØ© ÙˆØ­ÙˆÙ‘Ù„ Ù…Ø³ØªÙ†Ø¯Ø§ØªÙƒ Ø¨Ø£Ù…Ø§Ù† ÙØ§Ø¦Ù‚',
    heroSubtitle: 'Ø§ÙƒØªØ³Ø¨ Ù…Ù‡Ø§Ø±Ø§Øª ØªØ·ÙˆÙŠØ± Ø§Ù„ÙˆÙŠØ¨ ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ø³ØªØ®Ø¯Ù… Ø£ÙƒØ«Ø± Ù…Ù† 75 Ø£Ø¯Ø§Ø© Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ù…Ù„ÙØ§Øª Ù…Ø­Ù„ÙŠØ§Ù‹ Ø¨Ø¯ÙˆÙ† Ø±ÙØ¹Ù‡Ø§ Ø¥Ù„Ù‰ Ø£ÙŠ Ø®ÙˆØ§Ø¯Ù… Ø®Ø§Ø±Ø¬ÙŠØ©.',
    searchPlaceholder: 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø£ÙƒØ«Ø± Ù…Ù† 75 Ø£Ø¯Ø§Ø© ÙˆØ¯ÙˆØ±Ø© ØªØ¯Ø±ÙŠØ¨ÙŠØ© (Ù…Ø«Ù„: ØªØ­ÙˆÙŠÙ„ PDF Ø¥Ù„Ù‰ WordØŒ Ø¶ØºØ· Ø§Ù„ØµÙˆØ±)...',
    popularTools: 'Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© ÙˆØ§Ù„Ø£Ø³Ø§Ø³ÙŠØ©',
    allTools: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù€ 220+',
    exploreCategories: 'Ø§Ø³ØªÙƒØ´Ù Ø­Ø³Ø¨ Ø§Ù„ÙØ¦Ø©',
    privacyNotice: 'ØµÙØ± Ø±ÙØ¹ Ø¥Ù„Ù‰ Ø§Ù„Ø®ÙˆØ§Ø¯Ù… â€¢ Ù…Ø¹Ø§Ù„Ø¬Ø© Ù…Ø­Ù„ÙŠØ© Ø®Ø§ØµØ© Ø¨Ù†Ø³Ø¨Ø© 100%.',
    clientSideBadge: 'ØªØªÙ… Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© Ù…Ø­Ù„ÙŠØ§Ù‹ (Ø®Ø§Øµ Ø¨Ù†Ø³Ø¨Ø© 100%)',
    serverSideBadge: 'Ù…Ø­Ø±Ùƒ Ø³Ø­Ø§Ø¨ÙŠ',
    dropzoneTitle: 'Ø§Ø³Ø­Ø¨ ÙˆØ£ÙÙ„Øª Ù…Ù„ÙØ§ØªÙƒ Ù‡Ù†Ø§',
    dropzoneSubtitle: 'Ø£Ùˆ Ø§Ù†Ù‚Ø± Ù„Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ù„ÙØ§Øª Ù…Ù† Ø¬Ù‡Ø§Ø²Ùƒ',
    chooseFiles: 'Ø§Ø®ØªØ± Ø§Ù„Ù…Ù„ÙØ§Øª',
    processing: 'Ø¬Ø§Ø±Ù Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ù…Ù„ÙØ§Øª...',
    download: 'ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù†ØªÙŠØ¬Ø©',
    downloadAllZip: 'ØªØ­Ù…ÙŠÙ„ Ø§Ù„ÙƒÙ„ (Ù…Ù„Ù ZIP)',
    startAgain: 'Ù…Ø¹Ø§Ù„Ø¬Ø© Ù…Ù„Ù Ø¢Ø®Ø±',
    savedPercentage: 'ØªÙ… ØªÙˆÙÙŠØ±Ù‡',
    originalSize: 'Ø§Ù„Ø­Ø¬Ù… Ø§Ù„Ø£ØµÙ„ÙŠ',
    compressedSize: 'Ø§Ù„Ø­Ø¬Ù… Ø§Ù„Ø¬Ø¯ÙŠØ¯',
    nav: {
      home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      courses: 'Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„ØªØ¯Ø±ÙŠØ¨ÙŠØ©',
      dashboard: 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…',
      pdfTools: 'Ø£Ø¯ÙˆØ§Øª PDF',
      imageTools: 'Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØµÙˆØ±',
      documents: 'Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª',
      textTools: 'Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù†ØµÙˆØµ',
      compress: 'Ø§Ù„Ø¶ØºØ· ÙˆØ§Ù„ØªØ­Ø³ÙŠÙ†',
      ocr: 'Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„Ù†ØµÙˆØµ OCR',
      calculators: 'Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª ÙˆØ§Ù„Ù…Ø­ÙˆÙ„Ø§Øª',
      devTools: 'Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø·ÙˆØ±ÙŠÙ†',
      security: 'Ø§Ù„Ø£Ù…Ø§Ù† ÙˆØ§Ù„Ø®ØµÙˆØµÙŠØ©',
      qrBarcode: 'Ø§Ù„Ø¨Ø§Ø±ÙƒÙˆØ¯ ÙˆQR',
      aiTools: 'Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ',
      pdfEditor: 'Ù…Ø­Ø±Ø± PDF',
      workflows: 'Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„',
      allTools: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø¯ÙˆØ§Øª',
      quiz: 'Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ÙˆØ§Ù„ØªÙ‚ÙŠÙŠÙ…',
      myTools: 'Ø£Ø¯ÙˆØ§ØªÙŠ Ø§Ù„Ù…ÙØ¶Ù„Ø©',
      favorites: 'Ø§Ù„Ù…ÙØ¶Ù„Ø©',
      history: 'Ø§Ù„Ø³Ø¬Ù„',
      downloads: 'Ø§Ù„ØªÙ†Ø²ÙŠÙ„Ø§Øª',
      notifications: 'Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª',
      settings: 'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª',
      admin: 'Ù„ÙˆØ­Ø© Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©',
      login: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„',
      signup: 'Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨',
      logout: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬',
      myProfile: 'Ù…Ù„ÙÙŠ Ø§Ù„Ø´Ø®ØµÙŠ',
    },
    courses: {
      title: 'Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ©',
      subtitle: 'Ù…Ø³Ø§Ø±Ø§Øª ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ù…Ø¬Ø§Ù†ÙŠØ© ÙˆÙ…ÙØªÙˆØ­Ø©. ØªØµÙØ­ Ø§Ù„Ù…Ù†Ø§Ù‡Ø¬ Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠØ© ÙˆØ¹Ø§ÙŠÙ† Ø§Ù„Ø¯Ø±ÙˆØ³ Ù…Ø¬Ø§Ù†Ø§Ù‹ Ø£Ùˆ Ø³Ø¬Ù„ Ù„Ù…ØªØ§Ø¨Ø¹Ø© ØªÙ‚Ø¯Ù…Ùƒ ÙˆÙ†ÙŠÙ„ Ø§Ù„Ø´Ù‡Ø§Ø¯Ø§Øª.',
      browse: 'ØªØµÙØ­ Ø§Ù„Ø¯ÙˆØ±Ø§Øª',
      myCourses: 'Ø¯ÙˆØ±Ø§ØªÙŠ Ø§Ù„Ù…Ø³Ø¬Ù„Ø©',
      allCategories: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„ÙØ¦Ø§Øª',
      freePreview: 'Ù…Ø¹Ø§ÙŠÙ†Ø© Ù…Ø¬Ø§Ù†ÙŠØ©',
      enrollFree: 'Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ù…Ø¬Ø§Ù†Ø§Ù‹',
      enrolled: 'ØªÙ… Ø§Ù„ØªØ³Ø¬ÙŠÙ„',
      continueLearning: 'Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„ØªØ¹Ù„Ù…',
      resume: 'Ø§Ø³ØªØ¦Ù†Ø§Ù Ø§Ù„Ø¯Ø±Ø³',
      progress: 'Ù†Ø³Ø¨Ø© Ø§Ù„Ø¥Ù†Ø¬Ø§Ø²',
      completed: 'Ù…ÙƒØªÙ…Ù„',
      lessons: 'Ø§Ù„Ø¯Ø±ÙˆØ³',
      duration: 'Ø§Ù„Ù…Ø¯Ø© Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ©',
      instructor: 'Ø§Ù„Ù…Ø­Ø§Ø¶Ø±',
      curriculum: 'Ø§Ù„Ù…Ù†Ù‡Ø¬ ÙˆØ§Ù„Ø¯Ø±ÙˆØ³',
      overview: 'Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø¯ÙˆØ±Ø©',
      certificate: 'Ø´Ù‡Ø§Ø¯Ø© Ø¥ØªÙ…Ø§Ù… Ù…Ø¹ØªÙ…Ø¯Ø©',
      certificateDesc: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø´Ù‡Ø§Ø¯Ø© Ø±Ù‚Ù…ÙŠØ© Ù…ÙˆØ«Ù‚Ø© ÙÙˆØ± Ø¥ÙƒÙ…Ø§Ù„ Ø¬Ù…ÙŠØ¹ ÙˆØ­Ø¯Ø§Øª ÙˆÙ…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø¯ÙˆØ±Ø©.',
      noEnrollmentRequired: 'Ù„Ø§ ÙŠÙ„Ø²Ù… Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ù…Ø³Ø¨Ù‚ Ù„ØªØµÙØ­ Ø§Ù„Ø¯Ø±ÙˆØ³ ÙˆÙ…Ø´Ø§Ù‡Ø¯Ø© Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø§Øª.',
      enrollmentBenefitsTitle: 'Ù„Ù…Ø§Ø°Ø§ ØªØ³Ø¬Ù„ ÙÙŠ Ø§Ù„Ø¯ÙˆØ±Ø©ØŸ',
      benefit1: 'Ø­ÙØ¸ Ø§Ù„ØªÙ‚Ø¯Ù… ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¯Ø±ÙˆØ³ Ù…Ù† Ø­ÙŠØ« ØªÙˆÙ‚ÙØª',
      benefit2: 'ØªØªØ¨Ø¹ Ø§Ù„Ø¯Ø±ÙˆØ³ Ø§Ù„Ù…ÙƒØªÙ…Ù„Ø© ÙˆØ§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ø´Ø®ØµÙŠØ©',
      benefit3: 'Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ù…Ù„ÙØ§Øª Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ© ÙˆÙ†Ù…Ø§Ø°Ø¬ Ø§Ù„Ø£Ø¯ÙˆØ§Øª',
      benefit4: 'Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ø­ØµØ±ÙŠØ© ÙˆØ§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ÙˆØ´Ø§Ø±Ø§Øª Ø§Ù„ØªÙ…ÙŠØ²',
      filterByLevel: 'ØªØµÙÙŠØ© Ø­Ø³Ø¨ Ø§Ù„Ù…Ø³ØªÙˆÙ‰',
      allLevels: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø³ØªÙˆÙŠØ§Øª',
      beginner: 'Ù…Ø¨ØªØ¯Ø¦',
      intermediate: 'Ù…ØªÙˆØ³Ø·',
      advanced: 'Ù…ØªÙ‚Ø¯Ù…',
      searchCourses: 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø¨Ø§Ù„Ø¹Ù†ÙˆØ§Ù† Ø£Ùˆ Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ Ø£Ùˆ Ø§Ù„ØªÙ‚Ù†ÙŠØ©...',
      noCoursesFound: 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø¯ÙˆØ±Ø§Øª ØªØ·Ø§Ø¨Ù‚ Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø¨Ø­Ø«.',
      viewDetails: 'Ø¹Ø±Ø¶ Ø§Ù„Ù…Ù†Ù‡Ø¬',
      startCourse: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø¢Ù†',
      lessonLocked: 'Ø³Ø¬Ù„ Ù„Ø­ÙØ¸ ØªÙ‚Ø¯Ù…Ùƒ',
      lessonPreview: 'Ù…Ø¹Ø§ÙŠÙ†Ø© Ù…Ø¬Ø§Ù†ÙŠØ© Ù…ØªØ§Ø­Ø©',
    },
    auth: {
      signIn: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„',
      signUp: 'Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯',
      emailAddress: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
      password: 'ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
      fullName: 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„',
      forgotPassword: 'Ù‡Ù„ Ù†Ø³ÙŠØª ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±ØŸ',
      resetPassword: 'Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
      sendResetLink: 'Ø¥Ø±Ø³Ø§Ù„ Ø±Ø§Ø¨Ø· Ø§Ù„ØªØ¹ÙŠÙŠÙ†',
      resetLinkSent: 'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø±Ø§Ø¨Ø· Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ¹ÙŠÙŠÙ† Ø¥Ù„Ù‰ Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ.',
      rememberMe: 'ØªØ°ÙƒØ±Ù†ÙŠ Ø¹Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ø¬Ù‡Ø§Ø²',
      showPassword: 'Ø¥Ø¸Ù‡Ø§Ø± ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
      hidePassword: 'Ø¥Ø®ÙØ§Ø¡ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
      continueWithGoogle: 'Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Google',
      orEmail: 'Ø£Ùˆ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø¹Ø¨Ø± Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
      dontHaveAccount: 'Ù„ÙŠØ³ Ù„Ø¯ÙŠÙƒ Ø­Ø³Ø§Ø¨ØŸ',
      alreadyHaveAccount: 'Ù‡Ù„ Ù„Ø¯ÙŠÙƒ Ø­Ø³Ø§Ø¨ Ø¨Ø§Ù„ÙØ¹Ù„ØŸ',
      createAccount: 'Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ù…Ø¬Ø§Ù†ÙŠ',
      emailVerification: 'ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
      emailVerified: 'Ø­Ø³Ø§Ø¨ Ù…ÙˆØ«Ù‚ ÙˆÙ…Ø¤ÙƒØ¯',
      emailNotVerified: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ØºÙŠØ± Ù…Ø¤ÙƒØ¯ Ø¨Ø¹Ø¯',
      resendVerification: 'Ø¥Ø¹Ø§Ø¯Ø© Ø¥Ø±Ø³Ø§Ù„ Ø±Ø³Ø§Ù„Ø© Ø§Ù„ØªØ£ÙƒÙŠØ¯',
      verificationSent: 'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø±Ø§Ø¨Ø· Ø§Ù„ØªØ£ÙƒÙŠØ¯! ÙŠØ±Ø¬Ù‰ Ù…Ø±Ø§Ø¬Ø¹Ø© ØµÙ†Ø¯ÙˆÙ‚ Ø§Ù„ÙˆØ§Ø±Ø¯.',
      invalidCredentials: 'Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ ØºÙŠØ± ØµØ­ÙŠØ­Ø©. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ­Ù‚Ù‚ ÙˆØ¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø©.',
      accountCreatedSuccess: 'ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø¨Ù†Ø¬Ø§Ø­! Ù…Ø±Ø­Ø¨Ø§Ù‹ Ø¨Ùƒ Ù ÙŠ Ù†ÙŠÙƒØ³ÙˆØ±Ø§ Ø¨Ø±Ùˆ.',
      loginSuccess: 'ØªÙ… ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¨Ù†Ø¬Ø§Ø­!',
      logoutSuccess: 'ØªÙ… ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬ Ø¨Ø£Ù…Ø§Ù†.',
      passwordMinLength: 'ÙŠØ¬Ø¨ Ø£Ù„Ø§ ØªÙ‚Ù„ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø¹Ù† 6 Ø£Ø­Ø±Ù .',
      enterEmailPassword: 'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ ÙƒÙ„ Ù…Ù† Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙˆÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±.',
      enterAllFields: 'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„ ÙˆØ§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙˆÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±.',
      registrationFailed: 'Ù Ø´Ù„ Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.',
      enterEmailForReset: 'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø¹Ù†ÙˆØ§Ù† Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ù„ØªÙ„Ù‚ÙŠ Ø±Ø§Ø¨Ø· Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ¹ÙŠÙŠÙ†.',
      authSubtitle: 'Ù…ØµØ§Ø¯Ù‚Ø© Ø¢Ù…Ù†Ø© ÙˆÙ…Ø­Ù„ÙŠØ© Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ 100%',
    },
    userDashboard: {
      welcomeBack: 'Ù…Ø±Ø­Ø¨Ø§Ù‹ Ø¨Ø¹ÙˆØ¯ØªÙƒ',
      overview: 'Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø­Ø³Ø§Ø¨',
      myToolsTitle: 'Ø£Ø¯ÙˆØ§ØªÙŠ ÙˆØ§Ø®ØªØµØ§Ø±Ø§ØªÙŠ',
      myToolsSubtitle: 'Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ø³Ø±ÙŠØ¹ Ø¥Ù„Ù‰ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø±Ù‚Ù…ÙŠØ© Ø§Ù„ØªÙŠ ØªØ³ØªØ®Ø¯Ù…Ù‡Ø§ Ø¨ÙƒØ«Ø±Ø©.',
      favoritesTitle: 'Ø§Ù„Ù…ÙØ¶Ù„Ø© ÙˆØ§Ù„Ø¹Ù„Ø§Ù…Ø§Øª Ø§Ù„Ù…Ø±Ø¬Ø¹ÙŠØ©',
      favoritesSubtitle: 'Ø£Ø¯ÙˆØ§ØªÙƒ ÙˆØ¯ÙˆØ±Ø§ØªÙƒ Ø§Ù„Ù…ÙØ¶Ù„Ø© Ø§Ù„Ù…Ø­ÙÙˆØ¸Ø© ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.',
      historyTitle: 'Ø³Ø¬Ù„ Ø§Ù„Ù†Ø´Ø§Ø·Ø§Øª ÙˆØ§Ù„Ø¹Ù…Ù„ÙŠØ§Øª',
      historySubtitle: 'Ø§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø¯Ø±ÙˆØ³ Ø§Ù„ØªÙŠ ØªÙ… ÙØªØ­Ù‡Ø§ Ù…Ø¤Ø®Ø±Ø§Ù‹.',
      downloadsTitle: 'Ø§Ù„ØªÙ†Ø²ÙŠÙ„Ø§Øª ÙˆØ§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ù…Ù†Ø´Ø£Ø©',
      downloadsSubtitle: 'Ø¥Ø¹Ø§Ø¯Ø© ØªÙ†Ø²ÙŠÙ„ ÙˆØ¥Ø¯Ø§Ø±Ø© Ù…Ù„ÙØ§Øª PDF ÙˆØ§Ù„ØµÙˆØ± Ø§Ù„Ù†Ø§ØªØ¬Ø© Ù…Ø­Ù„ÙŠØ§Ù‹.',
      notificationsTitle: 'Ù…Ø±ÙƒØ² Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª',
      notificationsSubtitle: 'Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ø­Ø¯Ø« Ø§Ù„ØªØ­Ø¯ÙŠØ«Ø§Øª ÙˆØ¥ØµØ¯Ø§Ø±Ø§Øª Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø¯ÙˆØ±Ø§Øª.',
      settingsTitle: 'Ø§Ù„ØªÙØ¶ÙŠÙ„Ø§Øª ÙˆØ§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª',
      settingsSubtitle: 'ØªØ®ØµÙŠØµ Ø§Ù„Ù…Ø¸Ù‡Ø± ÙˆØ§Ù„Ù„ØºØ© ÙˆØ§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ÙˆØ®ÙŠØ§Ø±Ø§Øª Ø§Ù„Ø£Ù…Ø§Ù†.',
      profileTitle: 'Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø´Ø®ØµÙŠØ©',
      bioPlaceholder: 'Ø§ÙƒØªØ¨ Ù†Ø¨Ø°Ø© Ù…Ø®ØªØµØ±Ø© Ø¹Ù†Ùƒ Ø£Ùˆ Ø¹Ù† Ù…Ù‡Ø§Ø±Ø§ØªÙƒ...',
      saveProfile: 'Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª',
      profileUpdated: 'ØªÙ… ØªØ­Ø¯ÙŠØ« Ø§Ù„Ù…Ù„Ù Ø§Ù„Ø´Ø®ØµÙŠ Ø¨Ù†Ø¬Ø§Ø­!',
      joinedOn: 'ØªØ§Ø±ÙŠØ® Ø§Ù„Ø§Ù†Ø¶Ù…Ø§Ù…',
      accountStatus: 'Ø­Ø§Ù„Ø© Ø§Ù„Ø­Ø³Ø§Ø¨',
      verified: 'Ù…Ø¤ÙƒØ¯',
      unverified: 'ØºÙŠØ± Ù…Ø¤ÙƒØ¯',
      clearHistory: 'Ù…Ø³Ø­ Ø§Ù„Ø³Ø¬Ù„ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„',
      clearAll: 'Ù…Ø³Ø­ Ø§Ù„ÙƒÙ„',
      noHistory: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù†Ø´Ø§Ø·Ø§Øª Ù…Ø³Ø¬Ù„Ø© Ø¨Ø¹Ø¯. Ø§Ø¨Ø¯Ø£ Ø¨Ø§Ø³ØªÙƒØ´Ø§Ù Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø¯ÙˆØ±Ø§Øª!',
      noFavorites: 'Ù„Ù… ØªØªÙ… Ø¥Ø¶Ø§ÙØ© Ø£ÙŠ Ø¹Ù†Ø§ØµØ± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙØ¶Ù„Ø© Ø¨Ø¹Ø¯. Ø§Ù†Ù‚Ø± Ø¹Ù„Ù‰ Ø£ÙŠÙ‚ÙˆÙ†Ø© Ø§Ù„Ù†Ø¬Ù…Ø© Ù„Ù„Ø­ÙØ¸.',
      noDownloads: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù„ÙØ§Øª Ù…Ù†Ø´Ø£Ø© Ø¨Ø¹Ø¯. Ù‚Ù… Ø¨Ù…Ø¹Ø§Ù„Ø¬Ø© Ø£ÙŠ Ù…Ù„Ù Ù„ØªØ¸Ù‡Ø± ØªÙ†Ø²ÙŠÙ„Ø§ØªÙƒ Ù‡Ù†Ø§.',
      noNotifications: 'Ù„ÙŠØ³ Ù„Ø¯ÙŠÙƒ Ø£ÙŠ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø¬Ø¯ÙŠØ¯Ø© Ø­Ø§Ù„ÙŠØ§Ù‹.',
      markAllAsRead: 'ØªØ­Ø¯ÙŠØ¯ Ø§Ù„ÙƒÙ„ ÙƒÙ…Ù‚Ø±ÙˆØ¡',
      downloadAgain: 'Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªÙ†Ø²ÙŠÙ„',
      deleteItem: 'Ø­Ø°Ù Ø§Ù„Ø¹Ù†ØµØ±',
      changePassword: 'ØªØºÙŠÙŠØ± ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
      currentPassword: 'ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø§Ù„Ø­Ø§Ù„ÙŠØ©',
      newPassword: 'ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©',
      confirmNewPassword: 'ØªØ£ÙƒÙŠØ¯ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©',
      updatePasswordBtn: 'ØªØ­Ø¯ÙŠØ« ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
    },
    settings: {
      accountTab: 'Ø§Ù„Ø­Ø³Ø§Ø¨',
      appearanceTab: 'Ø§Ù„Ù…Ø¸Ù‡Ø± ÙˆØ§Ù„ØªØµÙ…ÙŠÙ…',
      languageTab: 'Ø§Ù„Ù„ØºØ©',
      notificationsTab: 'Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª',
      privacyTab: 'Ø§Ù„Ø®ØµÙˆØµÙŠØ©',
      securityTab: 'Ø§Ù„Ø£Ù…Ø§Ù†',
      themeMode: 'ÙˆØ¶Ø¹ Ø§Ù„Ø¹Ø±Ø¶',
      lightTheme: 'Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„ÙØ§ØªØ­',
      darkTheme: 'Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø¯Ø§ÙƒÙ†',
      systemTheme: 'ØªÙ„Ù‚Ø§Ø¦ÙŠ Ø­Ø³Ø¨ Ø§Ù„Ù†Ø¸Ø§Ù…',
      selectLanguage: 'Ø§Ø®ØªØ± Ù„ØºØ© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚',
      emailNotifications: 'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
      courseUpdates: 'ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ø¯ÙˆØ±Ø§Øª ÙˆØ§Ù„Ù…Ù†Ø§Ù‡Ø¬',
      toolAlerts: 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ø¥Ø·Ù„Ø§Ù‚ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©',
      securityAlerts: 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ø§Ù„Ø£Ù…Ø§Ù† ÙˆØ§Ù„Ø­Ø³Ø§Ø¨',
      marketingAnnouncements: 'Ø£Ø®Ø¨Ø§Ø± Ø§Ù„Ù…Ù†ØµØ© ÙˆÙ†ØµØ§Ø¦Ø­ Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…',
      dataStorage: 'Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆØ§Ù„Ø°Ø§ÙƒØ±Ø© Ø§Ù„Ù…Ø¤Ù‚ØªØ©',
      localStorageNotice: 'ÙŠØ­ÙØ¸ Ù†ÙŠÙƒØ³ÙˆØ±Ø§ ØªÙØ¶ÙŠÙ„Ø§ØªÙƒ ÙˆØ³Ø¬Ù„Ùƒ Ø¨Ø£Ù…Ø§Ù† ÙØ§Ø¦Ù‚ Ø¹Ù„Ù‰ Ø¬Ù‡Ø§Ø²Ùƒ Ø§Ù„Ø´Ø®ØµÙŠ ÙÙ‚Ø·.',
      clearCache: 'Ù…Ø³Ø­ Ø§Ù„Ø°Ø§ÙƒØ±Ø© Ø§Ù„Ù…Ø¤Ù‚ØªØ© Ø§Ù„Ù…Ø­Ù„ÙŠØ©',
      cacheCleared: 'ØªÙ… Ù…Ø³Ø­ Ø§Ù„Ø°Ø§ÙƒØ±Ø© Ø§Ù„Ù…Ø¤Ù‚ØªØ© Ø¨Ù†Ø¬Ø§Ø­.',
    },
    admin: {
      controlCenter: 'Ù…Ø±ÙƒØ² Ø¥Ø¯Ø§Ø±Ø© Ù†ÙŠÙƒØ³ÙˆØ±Ø§ Ø§Ù„Ù…ØªÙ‚Ø¯Ù…',
      analytics: 'Ø§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª ÙˆØ§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø­ÙŠØ©',
      userManagement: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†',
      courseManagement: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Øª',
      toolsManagement: 'Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„Ø£Ø¯ÙˆØ§Øª',
      contentManager: 'Ø§Ù„Ù…Ø­ØªÙˆÙ‰ ÙˆØ§Ù„ØªØ±Ø¬Ù…Ø§Øª',
      systemSettings: 'Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù†Ø¸Ø§Ù…',
      totalUsers: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† Ø§Ù„Ù…Ø³Ø¬Ù„ÙŠÙ†',
      activeUsers: 'Ø§Ù„Ø¬Ù„Ø³Ø§Øª Ø§Ù„Ù†Ø´Ø·Ø©',
      totalCourses: 'Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ù†Ø´ÙˆØ±Ø©',
      totalToolRuns: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ù…Ù†ÙØ°Ø©',
      systemHealth: 'Ø­Ø§Ù„Ø© Ø§Ù„Ø®ÙˆØ§Ø¯Ù… ÙˆØ§Ù„Ø£Ø¯Ø§Ø¡',
      addCourse: 'Ø¥Ø¶Ø§ÙØ© Ø¯ÙˆØ±Ø© Ø¬Ø¯ÙŠØ¯Ø©',
      editCourse: 'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±Ø©',
      deleteCourse: 'Ø­Ø°Ù Ø§Ù„Ø¯ÙˆØ±Ø©',
      publishCourse: 'Ù†Ø´Ø±',
      draftCourse: 'Ø­ÙØ¸ ÙƒÙ…Ø³ÙˆØ¯Ø©',
      enableTool: 'ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø£Ø¯Ø§Ø©',
      disableTool: 'ØªØ¹Ø·ÙŠÙ„ Ø§Ù„Ø£Ø¯Ø§Ø©',
      searchUsers: 'Ø§Ù„Ø¨Ø­Ø« Ø¨Ø§Ù„Ø§Ø³Ù… Ø£Ùˆ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø£Ùˆ Ø§Ù„Ø¯ÙˆØ±...',
      roleAdmin: 'Ù…Ø¯ÙŠØ± Ø§Ù„Ù†Ø¸Ø§Ù… (Admin)',
      roleUser: 'Ù…Ø³ØªØ®Ø¯Ù… Ù‚ÙŠØ§Ø³ÙŠ',
      makeAdmin: 'ØªØ±Ù‚ÙŠØ© Ø¥Ù„Ù‰ Ù…Ø¯ÙŠØ±',
      removeAdmin: 'ØªØ­ÙˆÙŠÙ„ Ø¥Ù„Ù‰ Ù…Ø³ØªØ®Ø¯Ù… Ø¹Ø§Ø¯ÙŠ',
      maintenanceMode: 'ÙˆØ¶Ø¹ Ø§Ù„ØµÙŠØ§Ù†Ø© Ù„Ù„Ù…Ù†ØµØ©',
      allowRegistration: 'Ø§Ù„Ø³Ù…Ø§Ø­ Ø¨ØªØ³Ø¬ÙŠÙ„ Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† Ø¬Ø¯Ø¯',
    },
    footer: {
      desc: 'Ù†ÙŠÙƒØ³ÙˆØ±Ø§ Ø¨Ø±Ùˆ Ù‡ÙŠ Ø§Ù„Ù…Ù†ØµØ© Ø§Ù„Ø±Ù‚Ù…ÙŠØ© Ø§Ù„Ø±Ø§Ø¦Ø¯Ø© Ø§Ù„ØªÙŠ ØªØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø£ÙƒØ«Ø± Ù…Ù† 75 Ø£Ø¯Ø§Ø© ÙØ§Ø¦Ù‚Ø© Ø§Ù„Ø£Ø¯Ø§Ø¡ ØªØ¹Ù…Ù„ Ù…Ø­Ù„ÙŠØ§Ù‹ Ø¨Ù†Ø³Ø¨Ø© 100% Ù…Ø¹ Ø¯ÙˆØ±Ø§Øª ØªØ¯Ø±ÙŠØ¨ÙŠØ© Ø´Ø§Ù…Ù„Ø© Ù„Ù„Ù…Ù‡Ø§Ø±Ø§Øª Ø§Ù„Ø±Ù‚Ù…ÙŠØ©.',
      quickLinks: 'Ø±ÙˆØ§Ø¨Ø· Ø³Ø±ÙŠØ¹Ø©',
      aboutPlatform: 'Ø¹Ù† Ø§Ù„Ù…Ù†ØµØ©',
      courses: 'Ø§Ø³ØªÙƒØ´Ø§Ù Ø§Ù„Ø¯ÙˆØ±Ø§Øª',
      tools: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø¯ÙˆØ§Øª (220+)',
      features: 'Ø§Ù„Ù…ÙŠØ²Ø§Øª ÙˆØ§Ù„Ø®ØµØ§Ø¦Øµ',
      helpSupport: 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙˆØ§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ',
      contactUs: 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
      privacyPolicy: 'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©',
      terms: 'Ø´Ø±ÙˆØ· Ø§Ù„Ø®Ø¯Ù…Ø©',
      refundPolicy: 'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø§Ø³ØªØ±Ø¬Ø§Ø¹',
      disclaimer: 'Ø¥Ø®Ù„Ø§Ø¡ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ',
      faq: 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© (FAQ)',
      userGuidelines: 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…',
      rights: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.',
      poweredBy: 'Ù…Ø­Ø±Ùƒ Ù…Ø¹Ø§Ù„Ø¬Ø© Ù…Ø­Ù„ÙŠ Ø®Ø§Øµ Ø¨Ù†Ø³Ø¨Ø© 100%.',
      clientSideSecurity: 'Ù„Ø§ ÙŠØªÙ… ØªØ®Ø²ÙŠÙ† Ø£Ùˆ Ø±ÙØ¹ Ø£ÙŠ Ù…Ù† Ù…Ù„ÙØ§ØªÙƒ Ø¥Ù„Ù‰ Ø®ÙˆØ§Ø¯Ù… Ø®Ø§Ø±Ø¬ÙŠØ© Ø¥Ø·Ù„Ø§Ù‚Ø§Ù‹.',
    },
    common: {
      save: 'Ø­ÙØ¸',
      cancel: 'Ø¥Ù„ØºØ§Ø¡',
      delete: 'Ø­Ø°Ù',
      edit: 'ØªØ¹Ø¯ÙŠÙ„',
      remove: 'Ø¥Ø²Ø§Ù„Ø©',
      open: 'ÙØªØ­',
      close: 'Ø¥ØºÙ„Ø§Ù‚',
      back: 'Ø±Ø¬ÙˆØ¹',
      next: 'Ø§Ù„ØªØ§Ù„ÙŠ',
      finish: 'Ø¥Ù†Ù‡Ø§Ø¡',
      confirm: 'ØªØ£ÙƒÙŠØ¯',
      loading: 'Ø¬Ø§Ø±Ù Ø§Ù„ØªØ­Ù…ÙŠÙ„...',
      success: 'ØªÙ…Øª Ø§Ù„Ø¹Ù…Ù„ÙŠØ© Ø¨Ù†Ø¬Ø§Ø­',
      error: 'Ø­Ø¯Ø« Ø®Ø·Ø£',
      all: 'Ø§Ù„ÙƒÙ„',
      free: 'Ù…Ø¬Ø§Ù†ÙŠ',
      pro: 'Ø¨Ø±Ùˆ',
      enterprise: 'Ø´Ø±ÙƒØ§Øª',
      filter: 'ØªØµÙÙŠØ©',
      search: 'Ø¨Ø­Ø«',
      viewAll: 'Ø¹Ø±Ø¶ Ø§Ù„ÙƒÙ„',
      noData: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ù…ØªØ§Ø­Ø©',
      fileSize: 'Ø­Ø¬Ù… Ø§Ù„Ù…Ù„Ù',
      date: 'Ø§Ù„ØªØ§Ø±ÙŠØ®',
      status: 'Ø§Ù„Ø­Ø§Ù„Ø©',
      action: 'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡',
    },
    quiz: {
      title: 'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ÙˆØªÙ‚ÙŠÙŠÙ… Ø§Ù„Ù…Ù‡Ø§Ø±Ø§Øª',
      subtitle: 'Ø§Ø®ØªØ¨Ø± Ù…Ù‡Ø§Ø±Ø§ØªÙƒ ÙÙŠ ØªØ·ÙˆÙŠØ± Ø§Ù„ÙˆÙŠØ¨ ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆÙ‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø¹Ø¨Ø± Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ØªÙØ§Ø¹Ù„ÙŠØ©.',
      startQuiz: 'Ø¨Ø¯Ø¡ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±',
      nextQuestion: 'Ø§Ù„Ø³Ø¤Ø§Ù„ Ø§Ù„ØªØ§Ù„ÙŠ',
      prevQuestion: 'Ø§Ù„Ø³Ø§Ø¨Ù‚',
      submitQuiz: 'ØªØ³Ù„ÙŠÙ… Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø§Øª ÙˆØ¹Ø±Ø¶ Ø§Ù„Ù†ØªÙŠØ¬Ø©',
      score: 'Ø¯Ø±Ø¬ØªÙƒ Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ©',
      passed: 'ØªÙ‡Ø§Ù†ÙŠÙ†Ø§! Ù„Ù‚Ø¯ Ø§Ø¬ØªØ²Øª Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø¨Ù†Ø¬Ø§Ø­ ðŸŽ‰',
      failed: 'ÙˆØ§ØµÙ„ Ø§Ù„ØªØ¯Ø±ÙŠØ¨ ÙˆØ§Ù„Ù…Ø­Ø§ÙˆÙ„Ø©',
      retake: 'Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±',
      explanation: 'Ø§Ù„Ø´Ø±Ø­ ÙˆØ§Ù„ØªÙˆØ¶ÙŠØ­',
      question: 'Ø§Ù„Ø³Ø¤Ø§Ù„',
      of: 'Ù…Ù†',
      correctAnswer: 'Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø§Ù„ØµØ­ÙŠØ­Ø©',
      yourAnswer: 'Ø¥Ø¬Ø§Ø¨ØªÙƒ',
      congratulations: 'Ø±Ø§Ø¦Ø¹ Ø¬Ø¯Ø§Ù‹! Ù„Ù‚Ø¯ Ø£Ø¸Ù‡Ø±Øª ÙÙ‡Ù…Ø§Ù‹ Ù…ØªÙ…ÙŠØ²Ø§Ù‹.',
      tryAgain: 'Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø¯Ø±ÙˆØ³ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰ ÙˆØ­Ø§ÙˆÙ„ ØªØ­Ø³ÙŠÙ† Ø¯Ø±Ø¬ØªÙƒ.',
      selectQuiz: 'Ø§Ø®ØªØ± Ù…ÙˆØ¶ÙˆØ¹ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±',
    },
    dialogs: {
      confirmTitle: 'ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡',
      confirmMessage: 'Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø±ØºØ¨ØªÙƒ ÙÙŠ Ù…ØªØ§Ø¨Ø¹Ø© Ù‡Ø°Ù‡ Ø§Ù„Ø¹Ù…Ù„ÙŠØ©ØŸ',
      deleteConfirmation: 'Ø³ÙŠØªÙ… Ø­Ø°Ù Ù‡Ø°Ø§ Ø§Ù„Ø¹Ù†ØµØ± Ù†Ù‡Ø§Ø¦ÙŠØ§Ù‹ Ù…Ù† Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.',
      saveChanges: 'Ø­ÙØ¸ Ø§Ù„ØªØºÙŠÙŠØ±Ø§Øª',
      discardChanges: 'Ø¥Ù„ØºØ§Ø¡ Ø§Ù„ØªØºÙŠÙŠØ±Ø§Øª',
      searchModalTitle: 'Ø§Ù„Ø¨Ø­Ø« Ø§Ù„Ø´Ø§Ù…Ù„ ÙÙŠ Ø§Ù„Ù…Ù†ØµØ©',
      searchModalPlaceholder: 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø£ÙƒØ«Ø± Ù…Ù† 75 Ø£Ø¯Ø§Ø© ÙˆØ¯ÙˆØ±Ø© ÙˆØ¯Ø±Ø³ ÙˆØ³ÙŠØ± Ø¹Ù…Ù„...',
    },
    errors: {
      general: 'Ø­Ø¯Ø« Ø®Ø·Ø£ ØºÙŠØ± Ù…ØªÙˆÙ‚Ø¹. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.',
      notFound: 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø§Ù„ØµÙØ­Ø© Ø£Ùˆ Ø§Ù„Ù…ÙˆØ±Ø¯ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨.',
      unauthorized: 'ÙŠØ¬Ø¨ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¨Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ù‡Ø°Ù‡ Ø§Ù„Ù…ÙŠØ²Ø©.',
      fileTooLarge: 'Ø­Ø¬Ù… Ø§Ù„Ù…Ù„Ù ÙŠØªØ¬Ø§ÙˆØ² Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ Ù„Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ© (500 Ù…ÙŠØ¬Ø§Ø¨Ø§ÙŠØª).',
      invalidFileType: 'Ù†ÙˆØ¹ Ø§Ù„Ù…Ù„Ù ØºÙŠØ± Ù…Ø¯Ø¹ÙˆÙ…. ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ù…Ø³ØªÙ†Ø¯ Ø£Ùˆ ØµÙˆØ±Ø© ØµØ§Ù„Ø­Ø©.',
      networkError: 'ÙØ´Ù„ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø´Ø¨ÙƒØ©. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§ØªØµØ§Ù„ Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª.',
      tryAgainLater: 'Ø§Ù†ØªÙ‡Øª Ø§Ù„Ù…Ù‡Ù„Ø©. ÙŠØ±Ø¬Ù‰ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ø¨Ø¹Ø¯ Ù„Ø­Ø¸Ø§Øª.',
    },
  },

  // ==================== HINDI (à¤¹à¤¿à¤¨à¥à¤¦à¥€) ====================
  hi: {
    appName: 'à¤¨à¥‡à¤•à¥à¤¸à¥‹à¤°à¤¾ à¤ªà¥à¤°à¥‹',
    tagline: 'à¤¹à¤° à¤«à¤¼à¤¾à¤‡à¤², à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤”à¤° à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤•à¥Œà¤¶à¤² à¤•à¥‡ à¤²à¤¿à¤ à¤¶à¤•à¥à¤¤à¤¿à¤¶à¤¾à¤²à¥€ à¤Ÿà¥‚à¤²à¥à¤¸ à¤”à¤° à¤²à¤°à¥à¤¨à¤¿à¤‚à¤— à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤®à¥¤',
    heroTitle: 'à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤•à¥Œà¤¶à¤² à¤¸à¥€à¤–à¥‡à¤‚ à¤”à¤° à¤«à¤¼à¤¾à¤‡à¤²à¥‹à¤‚ à¤•à¥‹ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤°à¥‚à¤ª à¤¸à¥‡ à¤°à¥‚à¤ªà¤¾à¤‚à¤¤à¤°à¤¿à¤¤ à¤•à¤°à¥‡à¤‚',
    heroSubtitle: 'à¤†à¤§à¥à¤¨à¤¿à¤• à¤µà¥‡à¤¬, à¤à¤†à¤ˆ à¤”à¤° à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤µà¤¿à¤¶à¥‡à¤·à¤œà¥à¤žà¤¤à¤¾ à¤¸à¥€à¤–à¥‡à¤‚ à¤”à¤° à¤¬à¤¿à¤¨à¤¾ à¤•à¤¿à¤¸à¥€ à¤¸à¤°à¥à¤µà¤° à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¥‡ 220+ à¤¤à¥‡à¤œà¤¼, 100% à¤¨à¤¿à¤œà¥€ à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ-à¤¸à¤¾à¤‡à¤¡ à¤Ÿà¥‚à¤²à¥à¤¸ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤',
    searchPlaceholder: '220+ à¤Ÿà¥‚à¤²à¥à¤¸, à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼ à¤¯à¤¾ à¤à¤•à¥à¤¶à¤¨ à¤–à¥‹à¤œà¥‡à¤‚ (à¤œà¥ˆà¤¸à¥‡: PDF to Word, Image Compress, JSON Formatter)...',
    popularTools: 'à¤²à¥‹à¤•à¤ªà¥à¤°à¤¿à¤¯ à¤”à¤° à¤†à¤µà¤¶à¥à¤¯à¤• à¤Ÿà¥‚à¤²à¥à¤¸',
    allTools: 'à¤¸à¤­à¥€ 220+ à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤Ÿà¥‚à¤²à¥à¤¸',
    exploreCategories: 'à¤¶à¥à¤°à¥‡à¤£à¥€ à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤–à¥‹à¤œà¥‡à¤‚',
    privacyNotice: 'à¤¶à¥‚à¤¨à¥à¤¯ à¤¸à¤°à¥à¤µà¤° à¤…à¤ªà¤²à¥‹à¤¡ â€¢ 100% à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ-à¤¸à¤¾à¤‡à¤¡ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸à¤¿à¤‚à¤—à¥¤',
    clientSideBadge: 'à¤²à¥‹à¤•à¤² à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ (100% à¤¨à¤¿à¤œà¥€)',
    serverSideBadge: 'à¤•à¥à¤²à¤¾à¤‰à¤¡ à¤‡à¤‚à¤œà¤¨',
    dropzoneTitle: 'à¤…à¤ªà¤¨à¥€ à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ à¤¯à¤¹à¤¾à¤ à¤¡à¥à¤°à¥ˆà¤— à¤”à¤° à¤¡à¥à¤°à¥‰à¤ª à¤•à¤°à¥‡à¤‚',
    dropzoneSubtitle: 'à¤¯à¤¾ à¤…à¤ªà¤¨à¥‡ à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤¸à¥‡ à¤«à¤¼à¤¾à¤‡à¤² à¤šà¥à¤¨à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¥‡à¤‚',
    chooseFiles: 'à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ à¤šà¥à¤¨à¥‡à¤‚',
    processing: 'à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤¹à¥‹ à¤°à¤¹à¥€ à¤¹à¥ˆà¤‚...',
    download: 'à¤°à¤¿à¤œà¤²à¥à¤Ÿ à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚',
    downloadAllZip: 'à¤¸à¤­à¥€ à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ (ZIP) à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚',
    startAgain: 'à¤…à¤¨à¥à¤¯ à¤«à¤¼à¤¾à¤‡à¤² à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤•à¤°à¥‡à¤‚',
    savedPercentage: 'à¤†à¤•à¤¾à¤° à¤•à¥€ à¤¬à¤šà¤¤',
    originalSize: 'à¤®à¥‚à¤² à¤†à¤•à¤¾à¤°',
    compressedSize: 'à¤¨à¤¯à¤¾ à¤†à¤•à¤¾à¤°',
    nav: {
      home: 'à¤¹à¥‹à¤®',
      courses: 'à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼',
      dashboard: 'à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡',
      pdfTools: 'PDF à¤Ÿà¥‚à¤²à¥à¤¸',
      imageTools: 'à¤‡à¤®à¥‡à¤œ à¤Ÿà¥‚à¤²à¥à¤¸',
      documents: 'à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼',
      textTools: 'à¤Ÿà¥‡à¤•à¥à¤¸à¥à¤Ÿ à¤Ÿà¥‚à¤²à¥à¤¸',
      compress: 'à¤•à¤‚à¤ªà¥à¤°à¥‡à¤¸ à¤Ÿà¥‚à¤²à¥à¤¸',
      ocr: 'OCR à¤¸à¥à¤Ÿà¥‚à¤¡à¤¿à¤¯à¥‹',
      calculators: 'à¤•à¥ˆà¤²à¤•à¥à¤²à¥‡à¤Ÿà¤°',
      devTools: 'à¤¡à¥‡à¤µà¤²à¤ªà¤° à¤Ÿà¥‚à¤²à¥à¤¸',
      security: 'à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤”à¤° à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾',
      qrBarcode: 'QR à¤µ à¤¬à¤¾à¤°à¤•à¥‹à¤¡',
      aiTools: 'AI à¤¸à¥à¤Ÿà¥‚à¤¡à¤¿à¤¯à¥‹',
      pdfEditor: 'PDF à¤à¤¡à¤¿à¤Ÿà¤°',
      workflows: 'à¤µà¤°à¥à¤•à¤«à¤¼à¥à¤²à¥‹',
      allTools: 'à¤¸à¤­à¥€ à¤Ÿà¥‚à¤²à¥à¤¸',
      quiz: 'à¤•à¥à¤µà¤¿à¤œà¤¼ à¤µ à¤Ÿà¥‡à¤¸à¥à¤Ÿ',
      myTools: 'à¤®à¥‡à¤°à¥‡ à¤Ÿà¥‚à¤²à¥à¤¸',
      favorites: 'à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾',
      history: 'à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸',
      downloads: 'à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡à¥à¤¸',
      notifications: 'à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚',
      settings: 'à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
      admin: 'à¤à¤¡à¤®à¤¿à¤¨ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤² à¤¸à¥‡à¤‚à¤Ÿà¤°',
      login: 'à¤²à¥‰à¤— à¤‡à¤¨',
      signup: 'à¤¸à¤¾à¤‡à¤¨ à¤…à¤ª',
      logout: 'à¤²à¥‰à¤— à¤†à¤‰à¤Ÿ',
      myProfile: 'à¤®à¥‡à¤°à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤²',
    },
    courses: {
      title: 'à¤®à¤¾à¤¸à¥à¤Ÿà¤° à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼ à¤à¤•à¥à¤¸à¤ªà¥à¤²à¥‹à¤° à¤•à¤°à¥‡à¤‚',
      subtitle: 'à¤®à¥à¤«à¤¼à¥à¤¤ à¤”à¤° à¤–à¥à¤²à¥‡ à¤²à¤°à¥à¤¨à¤¿à¤‚à¤— à¤ªà¤¾à¤¥à¥à¤¸à¥¤ à¤ªà¤¾à¤ à¥à¤¯à¤•à¥à¤°à¤® à¤¦à¥‡à¤–à¥‡à¤‚, à¤ªà¤¾à¤ à¥‹à¤‚ à¤•à¤¾ à¤ªà¥‚à¤°à¥à¤µà¤¾à¤µà¤²à¥‹à¤•à¤¨ à¤•à¤°à¥‡à¤‚ à¤¯à¤¾ à¤…à¤ªà¤¨à¥€ à¤ªà¥à¤°à¤—à¤¤à¤¿ à¤”à¤° à¤ªà¥à¤°à¤®à¤¾à¤£à¤ªà¤¤à¥à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¿à¤¤ à¤¹à¥‹à¤‚à¥¤',
      browse: 'à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼ à¤•à¤°à¥‡à¤‚',
      myCourses: 'à¤®à¥‡à¤°à¥‡ à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¿à¤¤ à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼',
      allCategories: 'à¤¸à¤­à¥€ à¤¶à¥à¤°à¥‡à¤£à¤¿à¤¯à¤¾à¤‚',
      freePreview: 'à¤®à¥à¤«à¤¼à¥à¤¤ à¤ªà¥‚à¤°à¥à¤µà¤¾à¤µà¤²à¥‹à¤•à¤¨',
      enrollFree: 'à¤®à¥à¤«à¤¼à¥à¤¤ à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¨ à¤•à¤°à¥‡à¤‚',
      enrolled: 'à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¿à¤¤',
      continueLearning: 'à¤¸à¥€à¤–à¤¨à¤¾ à¤œà¤¾à¤°à¥€ à¤°à¤–à¥‡à¤‚',
      resume: 'à¤ªà¤¾à¤  à¤«à¤¿à¤° à¤¸à¥‡ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚',
      progress: 'à¤•à¥‹à¤°à¥à¤¸ à¤ªà¥à¤°à¤—à¤¤à¤¿',
      completed: 'à¤ªà¥‚à¤°à¥à¤£',
      lessons: 'à¤•à¥à¤² à¤ªà¤¾à¤ ',
      duration: 'à¤•à¥à¤² à¤…à¤µà¤§à¤¿',
      instructor: 'à¤ªà¥à¤°à¤¶à¤¿à¤•à¥à¤·à¤•',
      curriculum: 'à¤ªà¤¾à¤ à¥à¤¯à¤•à¥à¤°à¤® à¤”à¤° à¤…à¤§à¥à¤¯à¤¾à¤¯',
      overview: 'à¤•à¥‹à¤°à¥à¤¸ à¤…à¤µà¤²à¥‹à¤•à¤¨',
      certificate: 'à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤ªà¥à¤°à¤®à¤¾à¤£à¤ªà¤¤à¥à¤°',
      certificateDesc: 'à¤¸à¤­à¥€ à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² à¤”à¤° à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤ªà¥‚à¤°à¥‡ à¤•à¤°à¤¨à¥‡ à¤ªà¤° à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤ªà¥à¤°à¤®à¤¾à¤£à¤ªà¤¤à¥à¤° à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚à¥¤',
      noEnrollmentRequired: 'à¤•à¥‹à¤°à¥à¤¸ à¤•à¤‚à¤Ÿà¥‡à¤‚à¤Ÿ à¤”à¤° à¤ªà¥‚à¤°à¥à¤µà¤¾à¤µà¤²à¥‹à¤•à¤¨ à¤¦à¥‡à¤–à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¨ à¤…à¤¨à¤¿à¤µà¤¾à¤°à¥à¤¯ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤',
      enrollmentBenefitsTitle: 'à¤•à¥‹à¤°à¥à¤¸ à¤®à¥‡à¤‚ à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¨ à¤•à¥à¤¯à¥‹à¤‚ à¤•à¤°à¥‡à¤‚?',
      benefit1: 'à¤…à¤ªà¤¨à¥€ à¤¸à¥€à¤–à¤¨à¥‡ à¤•à¥€ à¤ªà¥à¤°à¤—à¤¤à¤¿ à¤¸à¤¹à¥‡à¤œà¥‡à¤‚ à¤”à¤° à¤œà¤¹à¤¾à¤ à¤›à¥‹à¤¡à¤¼à¤¾ à¤¥à¤¾ à¤µà¤¹à¥€à¤‚ à¤¸à¥‡ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚',
      benefit2: 'à¤ªà¥‚à¤°à¥à¤£ à¤•à¤¿à¤ à¤—à¤ à¤ªà¤¾à¤ à¥‹à¤‚ à¤”à¤° à¤‰à¤ªà¤²à¤¬à¥à¤§à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤Ÿà¥à¤°à¥ˆà¤• à¤•à¤°à¥‡à¤‚',
      benefit3: 'à¤‡à¤‚à¤Ÿà¤°à¥ˆà¤•à¥à¤Ÿà¤¿à¤µ à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤«à¤¼à¤¾à¤‡à¤²à¥‹à¤‚ à¤”à¤° à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¤¨à¥‡ à¤¯à¥‹à¤—à¥à¤¯ à¤Ÿà¥‡à¤®à¥à¤ªà¥à¤²à¥‡à¤Ÿà¥à¤¸ à¤¤à¤• à¤ªà¤¹à¥à¤‚à¤šà¥‡à¤‚',
      benefit4: 'à¤…à¤ªà¤¡à¥‡à¤Ÿà¥à¤¸, à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚ à¤”à¤° à¤ªà¥‚à¤°à¤¾ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤•à¥‹à¤°à¥à¤¸ à¤¬à¥ˆà¤œ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚',
      filterByLevel: 'à¤¸à¥à¤¤à¤° à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤«à¤¼à¤¿à¤²à¥à¤Ÿà¤° à¤•à¤°à¥‡à¤‚',
      allLevels: 'à¤¸à¤­à¥€ à¤¸à¥à¤¤à¤°',
      beginner: 'à¤¶à¥à¤°à¥à¤†à¤¤à¥€ (Beginner)',
      intermediate: 'à¤®à¤§à¥à¤¯à¤® (Intermediate)',
      advanced: 'à¤‰à¤¨à¥à¤¨à¤¤ (Advanced)',
      searchCourses: 'à¤¶à¥€à¤°à¥à¤·à¤•, à¤µà¤¿à¤·à¤¯ à¤¯à¤¾ à¤¤à¤•à¤¨à¥€à¤• à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼ à¤–à¥‹à¤œà¥‡à¤‚...',
      noCoursesFound: 'à¤†à¤ªà¤•à¥‡ à¤–à¥‹à¤œ à¤®à¤¾à¤¨à¤¦à¤‚à¤¡à¥‹à¤‚ à¤¸à¥‡ à¤•à¥‹à¤ˆ à¤•à¥‹à¤°à¥à¤¸ à¤®à¥‡à¤² à¤¨à¤¹à¥€à¤‚ à¤–à¤¾à¤¤à¤¾à¥¤',
      viewDetails: 'à¤ªà¤¾à¤ à¥à¤¯à¤•à¥à¤°à¤® à¤¦à¥‡à¤–à¥‡à¤‚',
      startCourse: 'à¤¸à¥€à¤–à¤¨à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚',
      lessonLocked: 'à¤ªà¥à¤°à¤—à¤¤à¤¿ à¤¸à¤¹à¥‡à¤œà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¨ à¤•à¤°à¥‡à¤‚',
      lessonPreview: 'à¤®à¥à¤«à¤¼à¥à¤¤ à¤ªà¥‚à¤°à¥à¤µà¤¾à¤µà¤²à¥‹à¤•à¤¨ à¤‰à¤ªà¤²à¤¬à¥à¤§',
    },
    auth: {
      signIn: 'à¤¸à¤¾à¤‡à¤¨ à¤‡à¤¨',
      signUp: 'à¤¸à¤¾à¤‡à¤¨ à¤…à¤ª',
      emailAddress: 'à¤ˆà¤®à¥‡à¤² à¤ªà¤¤à¤¾',
      password: 'à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡',
      fullName: 'à¤ªà¥‚à¤°à¤¾ à¤¨à¤¾à¤®',
      forgotPassword: 'à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤­à¥‚à¤² à¤—à¤?',
      resetPassword: 'à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤°à¥€à¤¸à¥‡à¤Ÿ à¤•à¤°à¥‡à¤‚',
      sendResetLink: 'à¤°à¥€à¤¸à¥‡à¤Ÿ à¤²à¤¿à¤‚à¤• à¤­à¥‡à¤œà¥‡à¤‚',
      resetLinkSent: 'à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤°à¥€à¤¸à¥‡à¤Ÿ à¤²à¤¿à¤‚à¤• à¤†à¤ªà¤•à¥‡ à¤ˆà¤®à¥‡à¤² à¤ªà¤° à¤­à¥‡à¤œ à¤¦à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤',
      rememberMe: 'à¤‡à¤¸ à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤ªà¤° à¤®à¥ à¤ à¥‡ à¤¯à¤¾à¤¦ à¤°à¤–à¥‡à¤‚',
      showPassword: 'à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤¦à¤¿à¤–à¤¾à¤ à¤‚',
      hidePassword: 'à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤›à¤¿à¤ªà¤¾à¤ à¤‚',
      continueWithGoogle: 'Google à¤•à¥‡ à¤¸à¤¾à¤¥ à¤œà¤¾à¤°à¥€ à¤°à¤–à¥‡à¤‚',
      orEmail: 'à¤¯à¤¾ à¤ˆà¤®à¥‡à¤² à¤¦à¥ à¤µà¤¾à¤°à¤¾ à¤œà¤¾à¤°à¥€ à¤°à¤–à¥‡à¤‚',
      dontHaveAccount: 'à¤–à¤¾à¤¤à¤¾ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ?',
      alreadyHaveAccount: 'à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤–à¤¾à¤¤à¤¾ à¤¹à¥ˆ?',
      createAccount: 'à¤®à¥ à¤«à¤¼à¥ à¤¤ à¤–à¤¾à¤¤à¤¾ à¤¬à¤¨à¤¾à¤ à¤‚',
      emailVerification: 'à¤ˆà¤®à¥‡à¤² à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¨',
      emailVerified: 'à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¿à¤¤ à¤–à¤¾à¤¤à¤¾',
      emailNotVerified: 'à¤ˆà¤®à¥‡à¤² à¤…à¤­à¥€ à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ',
      resendVerification: 'à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¨ à¤ˆà¤®à¥‡à¤² à¤ªà¥ à¤¨à¤ƒ à¤­à¥‡à¤œà¥‡à¤‚',
      verificationSent: 'à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¨ à¤ˆà¤®à¥‡à¤² à¤­à¥‡à¤œ à¤¦à¥€ à¤—à¤ˆ à¤¹à¥ˆ! à¤…à¤ªà¤¨à¤¾ à¤‡à¤¨à¤¬à¥‰à¤•à¥ à¤¸ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤',
      invalidCredentials: 'à¤—à¤²à¤¤ à¤ˆà¤®à¥‡à¤² à¤¯à¤¾ à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤œà¤¾à¤ à¤š à¤•à¤° à¤ªà¥ à¤¨à¤ƒ à¤ªà¥ à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
      accountCreatedSuccess: 'à¤–à¤¾à¤¤à¤¾ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥ à¤µà¤• à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾! à¤¨à¥‡à¤•à¥ à¤¸à¥‹à¤°à¤¾ à¤ªà¥ à¤°à¥‹ à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¤¾ à¤¸à¥ à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆà¥¤',
      loginSuccess: 'à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥ à¤µà¤• à¤¸à¤¾à¤‡à¤¨ à¤‡à¤¨ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾!',
      logoutSuccess: 'à¤¸à¥ à¤°à¤•à¥ à¤·à¤¿à¤¤ à¤°à¥‚à¤ª à¤¸à¥‡ à¤²à¥‰à¤— à¤†à¤‰à¤Ÿ à¤¹à¥‹ à¤—à¤ à¥¤',
      passwordMinLength: 'à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤•à¤® à¤¸à¥‡ à¤•à¤® 6 à¤…à¤•à¥ à¤·à¤°à¥‹à¤‚ à¤•à¤¾ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤ à¥¤',
      enterEmailPassword: 'à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ˆà¤®à¥‡à¤² à¤”à¤° à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤¦à¥‹à¤¨à¥‹à¤‚ à¤¦à¤°à¥ à¤œ à¤•à¤°à¥‡à¤‚à¥¤',
      enterAllFields: 'à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤ªà¤¨à¤¾ à¤ªà¥‚à¤°à¤¾ à¤¨à¤¾à¤®, à¤ˆà¤®à¥‡à¤² à¤”à¤° à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤¦à¤°à¥ à¤œ à¤•à¤°à¥‡à¤‚à¥¤',
      registrationFailed: 'à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤µà¤¿à¤«à¤² à¤°à¤¹à¤¾à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥ à¤¨à¤ƒ à¤ªà¥ à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
      enterEmailForReset: 'à¤°à¥€à¤¸à¥‡à¤Ÿ à¤²à¤¿à¤‚à¤• à¤ªà¥ à¤°à¤¾à¤ªà¥ à¤¤ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤  à¤…à¤ªà¤¨à¤¾ à¤ˆà¤®à¥‡à¤² à¤¦à¤°à¥ à¤œ à¤•à¤°à¥‡à¤‚à¥¤',
      authSubtitle: 'à¤µà¤¿à¤¶à¥ à¤¦à¥ à¤§ à¤°à¥‚à¤ª à¤¸à¥‡ à¤‘à¤¨-à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤¸à¥ à¤°à¤•à¥ à¤·à¤¿à¤¤ à¤ªà¥ à¤°à¤®à¤¾à¤£à¥€à¤•à¤°à¤£',
    },
    userDashboard: {
      welcomeBack: 'à¤µà¤¾à¤ªà¤¸à¥€ à¤ªà¤° à¤¸à¥ à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ',
      overview: 'à¤–à¤¾à¤¤à¤¾ à¤…à¤µà¤²à¥‹à¤•à¤¨',
      myToolsTitle: 'à¤®à¥‡à¤°à¥‡ à¤Ÿà¥‚à¤²à¥ à¤¸ à¤”à¤° à¤¶à¥‰à¤°à¥ à¤Ÿà¤•à¤Ÿ',
      myToolsSubtitle: 'à¤…à¤ªà¤¨à¥‡ à¤¸à¤¬à¤¸à¥‡ à¤…à¤§à¤¿à¤• à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤¿à¤  à¤œà¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤”à¤° à¤ªà¤¿à¤¨ à¤•à¤¿à¤  à¤—à¤  à¤Ÿà¥‚à¤²à¥ à¤¸ à¤¤à¤• à¤¤à¥ à¤°à¤‚à¤¤ à¤ªà¤¹à¥ à¤‚à¤šà¥‡à¤‚à¥¤',
      favoritesTitle: 'à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾ à¤¬à¥ à¤•à¤®à¤¾à¤°à¥ à¤•',
      favoritesSubtitle: 'à¤†à¤ªà¤•à¥‡ à¤¸à¤¹à¥‡à¤œà¥‡ à¤—à¤  à¤Ÿà¥‚à¤²à¥ à¤¸ à¤”à¤° à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾ à¤•à¥‹à¤°à¥ à¤¸à¥‡à¤œà¤¼ à¤•à¥€ à¤¸à¥‚à¤šà¥€à¥¤',
      historyTitle: 'à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤”à¤° à¤°à¥‚à¤ªà¤¾à¤‚à¤¤à¤°à¤£ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸',
      historySubtitle: 'à¤¹à¤¾à¤² à¤¹à¥€ à¤®à¥‡à¤‚ à¤ªà¥ à¤°à¥‹à¤¸à¥‡à¤¸ à¤•à¥€ à¤—à¤ˆ à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚, à¤–à¥‹à¤²à¥‡ à¤—à¤  à¤Ÿà¥‚à¤²à¥ à¤¸ à¤”à¤° à¤¸à¥€à¤–à¥‡ à¤—à¤  à¤ªà¤¾à¤ à¥¤',
      downloadsTitle: 'à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤”à¤° à¤¬à¤¨à¤¾à¤ˆ à¤—à¤ˆ à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚',
      downloadsSubtitle: 'à¤…à¤ªà¤¨à¥€ à¤¬à¤¨à¤¾à¤ˆ à¤—à¤ˆ PDF, à¤‡à¤®à¥‡à¤œ à¤”à¤° à¤•à¤¨à¤µà¤°à¥ à¤Ÿ à¤•à¥€ à¤—à¤ˆ à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ à¤ªà¥ à¤¨à¤ƒ à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚à¥¤',
      notificationsTitle: 'à¤¸à¥‚à¤šà¤¨à¤¾ à¤•à¥‡à¤‚à¤¦à¥ à¤°',
      notificationsSubtitle: 'à¤¨à¤  à¤•à¥‹à¤°à¥ à¤¸à¥‡à¤œà¤¼, à¤Ÿà¥‚à¤² à¤…à¤ªà¤¡à¥‡à¤Ÿà¥ à¤¸ à¤”à¤° à¤ªà¥ à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥ à¤® à¤˜à¥‹à¤·à¤£à¤¾à¤“à¤‚ à¤¸à¥‡ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤°à¤¹à¥‡à¤‚à¥¤',
      settingsTitle: 'à¤ªà¥ à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾à¤ à¤‚ à¤”à¤° à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥ à¤¸',
      settingsSubtitle: 'à¤¥à¥€à¤®, à¤­à¤¾à¤·à¤¾, à¤¸à¥‚à¤šà¤¨à¤¾à¤ à¤‚ à¤”à¤° à¤¸à¥ à¤°à¤•à¥ à¤·à¤¾ à¤µà¤¿à¤•à¤²à¥ à¤ªà¥‹à¤‚ à¤•à¥‹ à¤…à¤¨à¥ à¤•à¥‚à¤²à¤¿à¤¤ à¤•à¤°à¥‡à¤‚à¥¤',
      profileTitle: 'à¤ªà¥ à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€',
      bioPlaceholder: 'à¤…à¤ªà¤¨à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤¯à¤¾ à¤…à¤ªà¤¨à¥‡ à¤•à¥Œà¤¶à¤² à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤¸à¤‚à¤•à¥ à¤·à¤¿à¤ªà¥ à¤¤ à¤µà¤¿à¤µà¤°à¤£ à¤²à¤¿à¤–à¥‡à¤‚...',
      saveProfile: 'à¤¬à¤¦à¤²à¤¾à¤µ à¤¸à¤¹à¥‡à¤œà¥‡à¤‚',
      profileUpdated: 'à¤ªà¥ à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥ à¤µà¤• à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤¹à¥‹ à¤—à¤ˆ!',
      joinedOn: 'à¤¸à¤¦à¤¸à¥ à¤¯à¤¤à¤¾ à¤¤à¤¿à¤¥à¤¿',
      accountStatus: 'à¤–à¤¾à¤¤à¤¾ à¤¸à¥ à¤¥à¤¿à¤¤à¤¿',
      verified: 'à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¿à¤¤',
      unverified: 'à¤…à¤¸à¤¤à¥ à¤¯à¤¾à¤ªà¤¿à¤¤',
      clearHistory: 'à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤¸à¤¾à¤«à¤¼ à¤•à¤°à¥‡à¤‚',
      clearAll: 'à¤¸à¤­à¥€ à¤¸à¤¾à¤«à¤¼ à¤•à¤°à¥‡à¤‚',
      noHistory: 'à¤…à¤­à¥€ à¤•à¥‹à¤ˆ à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤°à¤¿à¤•à¥‰à¤°à¥ à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ à¤ˆ à¤¹à¥ˆà¥¤ à¤Ÿà¥‚à¤²à¥ à¤¸ à¤”à¤° à¤•à¥‹à¤°à¥ à¤¸à¥‡à¤œà¤¼ à¤ à¤•à¥ à¤¸à¤ªà¥ à¤²à¥‹à¤° à¤•à¤°à¥‡à¤‚!',
      noFavorites: 'à¤•à¥‹à¤ˆ à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾ à¤†à¤‡à¤Ÿà¤® à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤Ÿà¥‚à¤² à¤¯à¤¾ à¤•à¥‹à¤°à¥ à¤¸ à¤ªà¤° à¤¸à¥ à¤Ÿà¤¾à¤° à¤¦à¤¬à¤¾à¤•à¤° à¤¸à¤¹à¥‡à¤œà¥‡à¤‚à¥¤',
      noDownloads: 'à¤…à¤­à¥€ à¤•à¥‹à¤ˆ à¤«à¤¼à¤¾à¤‡à¤² à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ à¤ˆ à¤¹à¥ˆà¥¤ à¤•à¤¿à¤¸à¥€ à¤Ÿà¥‚à¤² à¤ªà¤° à¤•à¤¾à¤® à¤•à¤°à¤•à¥‡ à¤«à¤¼à¤¾à¤‡à¤² à¤ªà¥ à¤°à¤¾à¤ªà¥ à¤¤ à¤•à¤°à¥‡à¤‚à¥¤',
      noNotifications: 'à¤†à¤ªà¤•à¥‡ à¤ªà¤¾à¤¸ à¤•à¥‹à¤ˆ à¤¨à¤ˆ à¤¸à¥‚à¤šà¤¨à¤¾ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤',
      markAllAsRead: 'à¤¸à¤­à¥€ à¤•à¥‹ à¤ªà¤¢à¤¼à¤¾ à¤¹à¥ à¤† à¤šà¤¿à¤¹à¥ à¤¨à¤¿à¤¤ à¤•à¤°à¥‡à¤‚',
      downloadAgain: 'à¤ªà¥ à¤¨à¤ƒ à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚',
      deleteItem: 'à¤¹à¤Ÿà¤¾à¤ à¤‚',
      changePassword: 'à¤–à¤¾à¤¤à¤¾ à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤¬à¤¦à¤²à¥‡à¤‚',
      currentPassword: 'à¤µà¤°à¥ à¤¤à¤®à¤¾à¤¨ à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡',
      newPassword: 'à¤¨à¤¯à¤¾ à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡',
      confirmNewPassword: 'à¤¨à¤  à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤•à¥€ à¤ªà¥ à¤·à¥ à¤Ÿà¤¿ à¤•à¤°à¥‡à¤‚',
      updatePasswordBtn: 'à¤ªà¤¾à¤¸à¤µà¤°à¥ à¤¡ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤•à¤°à¥‡à¤‚',
    },
    settings: {
      accountTab: 'à¤–à¤¾à¤¤à¤¾',
      appearanceTab: 'à¤¦à¤¿à¤–à¤¾à¤µà¤Ÿ (à¤¥à¥€à¤®)',
      languageTab: 'à¤­à¤¾à¤·à¤¾',
      notificationsTab: 'à¤¸à¥‚à¤šà¤¨à¤¾à¤ à¤‚',
      privacyTab: 'à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾',
      securityTab: 'à¤¸à¥à¤°à¤•à¥à¤·à¤¾',
      themeMode: 'à¤¥à¥€à¤® à¤®à¥‹à¤¡',
      lightTheme: 'à¤²à¤¾à¤‡à¤Ÿ à¤®à¥‹à¤¡',
      darkTheme: 'à¤¡à¤¾à¤°à¥à¤• à¤®à¥‹à¤¡',
      systemTheme: 'à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤¡à¤¿à¤«à¤¼à¥‰à¤²à¥à¤Ÿ',
      selectLanguage: 'à¤à¤ª à¤•à¥€ à¤­à¤¾à¤·à¤¾ à¤šà¥à¤¨à¥‡à¤‚',
      emailNotifications: 'à¤ˆà¤®à¥‡à¤² à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚',
      courseUpdates: 'à¤•à¥‹à¤°à¥à¤¸ à¤”à¤° à¤ªà¤¾à¤ à¥à¤¯à¤•à¥à¤°à¤® à¤…à¤ªà¤¡à¥‡à¤Ÿà¥à¤¸',
      toolAlerts: 'à¤¨à¤ à¤Ÿà¥‚à¤²à¥à¤¸ à¤”à¤° à¤…à¤ªà¤—à¥à¤°à¥‡à¤¡ à¤…à¤²à¤°à¥à¤Ÿà¥à¤¸',
      securityAlerts: 'à¤–à¤¾à¤¤à¤¾ à¤”à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤…à¤²à¤°à¥à¤Ÿà¥à¤¸',
      marketingAnnouncements: 'à¤‰à¤¤à¥à¤ªà¤¾à¤¦ à¤¸à¤®à¤¾à¤šà¤¾à¤° à¤”à¤° à¤‰à¤ªà¤¯à¥‹à¤—à¥€ à¤Ÿà¤¿à¤ªà¥à¤¸',
      dataStorage: 'à¤²à¥‹à¤•à¤² à¤¡à¥‡à¤Ÿà¤¾ à¤”à¤° à¤•à¥ˆà¤¶',
      localStorageNotice: 'à¤¨à¥‡à¤•à¥à¤¸à¥‹à¤°à¤¾ à¤†à¤ªà¤•à¥€ à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾à¤“à¤‚ à¤”à¤° à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤•à¥‹ à¤†à¤ªà¤•à¥‡ à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤ªà¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤°à¤–à¤¤à¤¾ à¤¹à¥ˆà¥¤',
      clearCache: 'à¤²à¥‹à¤•à¤² à¤•à¥ˆà¤¶ à¤¸à¤¾à¤«à¤¼ à¤•à¤°à¥‡à¤‚',
      cacheCleared: 'à¤²à¥‹à¤•à¤² à¤•à¥ˆà¤¶ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤¸à¤¾à¤«à¤¼ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤',
    },
    admin: {
      controlCenter: 'à¤¨à¥‡à¤•à¥à¤¸à¥‹à¤°à¤¾ à¤à¤¡à¤®à¤¿à¤¨ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤² à¤¸à¥‡à¤‚à¤Ÿà¤°',
      analytics: 'à¤à¤¨à¤¾à¤²à¤¿à¤Ÿà¤¿à¤•à¥à¤¸ à¤”à¤° à¤Ÿà¥‡à¤²à¥€à¤®à¥‡à¤Ÿà¥à¤°à¥€',
      userManagement: 'à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾ à¤ªà¥à¤°à¤¬à¤‚à¤§à¤¨',
      courseManagement: 'à¤•à¥‹à¤°à¥à¤¸ à¤ªà¥à¤°à¤¬à¤‚à¤§à¤¨',
      toolsManagement: 'à¤Ÿà¥‚à¤²à¥à¤¸ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£',
      contentManager: 'à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤”à¤° à¤…à¤¨à¥à¤µà¤¾à¤¦',
      systemSettings: 'à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
      totalUsers: 'à¤•à¥à¤² à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾',
      activeUsers: 'à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤¸à¤¤à¥à¤°',
      totalCourses: 'à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼',
      totalToolRuns: 'à¤•à¥à¤² à¤«à¤¼à¤¾à¤‡à¤² à¤¨à¤¿à¤·à¥à¤ªà¤¾à¤¦à¤¨',
      systemHealth: 'à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯ à¤”à¤° à¤¸à¤°à¥à¤µà¤° à¤¸à¥à¤¥à¤¿à¤¤à¤¿',
      addCourse: 'à¤¨à¤¯à¤¾ à¤•à¥‹à¤°à¥à¤¸ à¤œà¥‹à¤¡à¤¼à¥‡à¤‚',
      editCourse: 'à¤•à¥‹à¤°à¥à¤¸ à¤¸à¤‚à¤ªà¤¾à¤¦à¤¿à¤¤ à¤•à¤°à¥‡à¤‚',
      deleteCourse: 'à¤•à¥‹à¤°à¥à¤¸ à¤¹à¤Ÿà¤¾à¤à¤‚',
      publishCourse: 'à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤•à¤°à¥‡à¤‚',
      draftCourse: 'à¤¡à¥à¤°à¤¾à¤«à¥à¤Ÿ à¤¸à¤¹à¥‡à¤œà¥‡à¤‚',
      enableTool: 'à¤Ÿà¥‚à¤² à¤šà¤¾à¤²à¥‚ à¤•à¤°à¥‡à¤‚',
      disableTool: 'à¤Ÿà¥‚à¤² à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚',
      searchUsers: 'à¤¨à¤¾à¤®, à¤ˆà¤®à¥‡à¤² à¤¯à¤¾ à¤­à¥‚à¤®à¤¿à¤•à¤¾ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤–à¥‹à¤œà¥‡à¤‚...',
      roleAdmin: 'à¤µà¥à¤¯à¤µà¤¸à¥à¤¥à¤¾à¤ªà¤• (Admin)',
      roleUser: 'à¤®à¤¾à¤¨à¤• à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾',
      makeAdmin: 'à¤à¤¡à¤®à¤¿à¤¨ à¤¬à¤¨à¤¾à¤à¤‚',
      removeAdmin: 'à¤®à¤¾à¤¨à¤• à¤¯à¥‚à¤œà¤° à¤¬à¤¨à¤¾à¤à¤‚',
      maintenanceMode: 'à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤®à¥‡à¤‚à¤Ÿà¥‡à¤¨à¥‡à¤‚à¤¸ à¤®à¥‹à¤¡',
      allowRegistration: 'à¤¨à¤ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¥€ à¤…à¤¨à¥à¤®à¤¤à¤¿ à¤¦à¥‡à¤‚',
    },
    footer: {
      desc: 'à¤¨à¥‡à¤•à¥à¤¸à¥‹à¤°à¤¾ à¤ªà¥à¤°à¥‹ à¤à¤• à¤ªà¥à¤°à¤®à¥à¤– à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤¹à¥ˆ à¤œà¥‹ 220+ à¤¶à¤•à¥à¤¤à¤¿à¤¶à¤¾à¤²à¥€ à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ-à¤¸à¤¾à¤‡à¤¡ à¤Ÿà¥‚à¤²à¥à¤¸ à¤•à¥‹ à¤†à¤§à¥à¤¨à¤¿à¤• à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤•à¥Œà¤¶à¤² à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤œà¥‹à¤¡à¤¼à¤¤à¤¾ à¤¹à¥ˆà¥¤',
      quickLinks: 'à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤²à¤¿à¤‚à¤•',
      aboutPlatform: 'à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚',
      courses: 'à¤¸à¤­à¥€ à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼',
      tools: 'à¤¸à¤­à¥€ 220+ à¤Ÿà¥‚à¤²à¥à¤¸',
      features: 'à¤®à¥à¤–à¥à¤¯ à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤‚',
      helpSupport: 'à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤µ à¤¸à¤®à¤°à¥à¤¥à¤¨',
      contactUs: 'à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚',
      privacyPolicy: 'à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤¨à¥€à¤¤à¤¿',
      terms: 'à¤¸à¥‡à¤µà¤¾ à¤•à¥€ à¤¶à¤°à¥à¤¤à¥‡à¤‚',
      refundPolicy: 'à¤°à¤¿à¤«à¤‚à¤¡ à¤¨à¥€à¤¤à¤¿',
      disclaimer: 'à¤•à¤¾à¤¨à¥‚à¤¨à¥€ à¤…à¤¸à¥à¤µà¥€à¤•à¤°à¤£',
      faq: 'à¤…à¤•à¥à¤¸à¤° à¤ªà¥‚à¤›à¥‡ à¤œà¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤ªà¥à¤°à¤¶à¥à¤¨ (FAQ)',
      userGuidelines: 'à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾ à¤¦à¤¿à¤¶à¤¾à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶',
      rights: 'à¤¸à¤°à¥à¤µà¤¾à¤§à¤¿à¤•à¤¾à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤à¥¤',
      poweredBy: '100% à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ-à¤¸à¤¾à¤‡à¤¡ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸à¤¿à¤‚à¤— à¤‡à¤‚à¤œà¤¨à¥¤',
      clientSideSecurity: 'à¤†à¤ªà¤•à¥€ à¤«à¤¼à¤¾à¤‡à¤²à¥‡à¤‚ à¤•à¤­à¥€ à¤­à¥€ à¤¬à¤¾à¤¹à¤°à¥€ à¤¸à¤°à¥à¤µà¤° à¤ªà¤° à¤…à¤ªà¤²à¥‹à¤¡ à¤¯à¤¾ à¤¸à¤‚à¤—à¥à¤°à¤¹à¥€à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤',
    },
    common: {
      save: 'à¤¸à¤¹à¥‡à¤œà¥‡à¤‚',
      cancel: 'à¤°à¤¦à¥à¤¦ à¤•à¤°à¥‡à¤‚',
      delete: 'à¤¹à¤Ÿà¤¾à¤à¤‚',
      edit: 'à¤¸à¤‚à¤ªà¤¾à¤¦à¤¿à¤¤ à¤•à¤°à¥‡à¤‚',
      remove: 'à¤¨à¤¿à¤•à¤¾à¤²à¥‡à¤‚',
      open: 'à¤–à¥‹à¤²à¥‡à¤‚',
      close: 'à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚',
      back: 'à¤ªà¥€à¤›à¥‡',
      next: 'à¤†à¤—à¥‡',
      finish: 'à¤¸à¤®à¤¾à¤ªà¥à¤¤',
      confirm: 'à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¤°à¥‡à¤‚',
      loading: 'à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ...',
      success: 'à¤¸à¤«à¤²à¤¤à¤¾',
      error: 'à¤¤à¥à¤°à¥à¤Ÿà¤¿',
      all: 'à¤¸à¤­à¥€',
      free: 'à¤®à¥à¤«à¤¼à¥à¤¤',
      pro: 'à¤ªà¥à¤°à¥‹',
      enterprise: 'à¤à¤‚à¤Ÿà¤°à¤ªà¥à¤°à¤¾à¤‡à¤œ',
      filter: 'à¤«à¤¼à¤¿à¤²à¥à¤Ÿà¤°',
      search: 'à¤–à¥‹à¤œà¥‡à¤‚',
      viewAll: 'à¤¸à¤­à¥€ à¤¦à¥‡à¤–à¥‡à¤‚',
      noData: 'à¤•à¥‹à¤ˆ à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ',
      fileSize: 'à¤«à¤¼à¤¾à¤‡à¤² à¤•à¤¾ à¤†à¤•à¤¾à¤°',
      date: 'à¤¤à¤¾à¤°à¥€à¤–',
      status: 'à¤¸à¥à¤¥à¤¿à¤¤à¤¿',
      action: 'à¤•à¤¾à¤°à¥à¤°à¤µà¤¾à¤ˆ',
    },
    quiz: {
      title: 'à¤•à¥Œà¤¶à¤² à¤”à¤° à¤œà¥à¤žà¤¾à¤¨ à¤•à¥€ à¤œà¤¾à¤‚à¤š (à¤•à¥à¤µà¤¿à¤œà¤¼)',
      subtitle: 'à¤«à¥à¤²-à¤¸à¥à¤Ÿà¥ˆà¤• à¤µà¥‡à¤¬ à¤¡à¥‡à¤µà¤²à¤ªà¤®à¥‡à¤‚à¤Ÿ, à¤ªà¤¾à¤¯à¤¥à¤¨ à¤à¤†à¤ˆ à¤”à¤° à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤µà¤¿à¤¶à¥‡à¤·à¤œà¥à¤žà¤¤à¤¾ à¤•à¥€ à¤‡à¤‚à¤Ÿà¤°à¥ˆà¤•à¥à¤Ÿà¤¿à¤µ à¤œà¤¾à¤‚à¤š à¤•à¤°à¥‡à¤‚à¥¤',
      startQuiz: 'à¤Ÿà¥‡à¤¸à¥à¤Ÿ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚',
      nextQuestion: 'à¤…à¤—à¤²à¤¾ à¤ªà¥à¤°à¤¶à¥à¤¨',
      prevQuestion: 'à¤ªà¤¿à¤›à¤²à¤¾ à¤ªà¥à¤°à¤¶à¥à¤¨',
      submitQuiz: 'à¤°à¤¿à¤œà¤²à¥à¤Ÿ à¤¦à¥‡à¤–à¥‡à¤‚',
      score: 'à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤•à¥‹à¤°',
      passed: 'à¤¬à¤§à¤¾à¤ˆ à¤¹à¥‹! à¤†à¤ª à¤‰à¤¤à¥à¤¤à¥€à¤°à¥à¤£ à¤¹à¥à¤ ðŸŽ‰',
      failed: 'à¤ªà¥à¤¨à¤ƒ à¤…à¤­à¥à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚',
      retake: 'à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤Ÿà¥‡à¤¸à¥à¤Ÿ à¤¦à¥‡à¤‚',
      explanation: 'à¤µà¥à¤¯à¤¾à¤–à¥à¤¯à¤¾ à¤”à¤° à¤®à¥à¤–à¥à¤¯ à¤¬à¤¿à¤‚à¤¦à¥',
      question: 'à¤ªà¥à¤°à¤¶à¥à¤¨',
      of: 'à¤®à¥‡à¤‚ à¤¸à¥‡',
      correctAnswer: 'à¤¸à¤¹à¥€ à¤‰à¤¤à¥à¤¤à¤°',
      yourAnswer: 'à¤†à¤ªà¤•à¤¾ à¤‰à¤¤à¥à¤¤à¤°',
      congratulations: 'à¤…à¤¦à¥à¤­à¥à¤¤! à¤†à¤ªà¤¨à¥‡ à¤¶à¤¾à¤¨à¤¦à¤¾à¤° à¤œà¥à¤žà¤¾à¤¨ à¤•à¤¾ à¤ªà¥à¤°à¤¦à¤°à¥à¤¶à¤¨ à¤•à¤¿à¤¯à¤¾à¥¤',
      tryAgain: 'à¤ªà¤¾à¤ à¥‹à¤‚ à¤•à¥€ à¤ªà¥à¤¨à¤ƒ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¬à¥‡à¤¹à¤¤à¤° à¤¸à¥à¤•à¥‹à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤«à¤¿à¤° à¤¸à¥‡ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
      selectQuiz: 'à¤•à¥à¤µà¤¿à¤œà¤¼ à¤•à¤¾ à¤µà¤¿à¤·à¤¯ à¤šà¥à¤¨à¥‡à¤‚',
    },
    dialogs: {
      confirmTitle: 'à¤•à¤¾à¤°à¥à¤°à¤µà¤¾à¤ˆ à¤•à¥€ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¤°à¥‡à¤‚',
      confirmMessage: 'à¤•à¥à¤¯à¤¾ à¤†à¤ª à¤µà¤¾à¤•à¤ˆ à¤‡à¤¸ à¤‘à¤ªà¤°à¥‡à¤¶à¤¨ à¤•à¥‹ à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¤¾à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚?',
      deleteConfirmation: 'à¤¯à¤¹ à¤†à¤‡à¤Ÿà¤® à¤†à¤ªà¤•à¥‡ à¤µà¤°à¥à¤•à¤¸à¥à¤ªà¥‡à¤¸ à¤¸à¥‡ à¤¸à¥à¤¥à¤¾à¤¯à¥€ à¤°à¥‚à¤ª à¤¸à¥‡ à¤¹à¤Ÿà¤¾ à¤¦à¤¿à¤¯à¤¾ à¤œà¤¾à¤à¤—à¤¾à¥¤',
      saveChanges: 'à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨ à¤¸à¤¹à¥‡à¤œà¥‡à¤‚',
      discardChanges: 'à¤°à¤¦à¥à¤¦ à¤•à¤°à¥‡à¤‚',
      searchModalTitle: 'à¤¯à¥‚à¤¨à¤¿à¤µà¤°à¥à¤¸à¤² à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤–à¥‹à¤œ',
      searchModalPlaceholder: '220+ à¤Ÿà¥‚à¤²à¥à¤¸, à¤•à¥‹à¤°à¥à¤¸à¥‡à¤œà¤¼, à¤ªà¤¾à¤  à¤”à¤° à¤µà¤°à¥à¤•à¤«à¤¼à¥à¤²à¥‹ à¤–à¥‹à¤œà¥‡à¤‚...',
    },
    errors: {
      general: 'à¤à¤• à¤…à¤ªà¥à¤°à¤¤à¥à¤¯à¤¾à¤¶à¤¿à¤¤ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤‰à¤¤à¥à¤ªà¤¨à¥à¤¨ à¤¹à¥à¤ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
      notFound: 'à¤…à¤¨à¥à¤°à¥‹à¤§à¤¿à¤¤ à¤ªà¥ƒà¤·à¥à¤  à¤¯à¤¾ à¤¸à¤‚à¤¸à¤¾à¤§à¤¨ à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤',
      unauthorized: 'à¤‡à¤¸ à¤¸à¥à¤µà¤¿à¤§à¤¾ à¤¤à¤• à¤ªà¤¹à¥à¤à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤†à¤ªà¤•à¤¾ à¤²à¥‰à¤—à¤¿à¤¨ à¤¹à¥‹à¤¨à¤¾ à¤†à¤µà¤¶à¥à¤¯à¤• à¤¹à¥ˆà¥¤',
      fileTooLarge: 'à¤šà¤¯à¤¨à¤¿à¤¤ à¤«à¤¼à¤¾à¤‡à¤² 500MB à¤•à¥€ à¤²à¥‹à¤•à¤² à¤¸à¥€à¤®à¤¾ à¤¸à¥‡ à¤…à¤§à¤¿à¤• à¤¹à¥ˆà¥¤',
      invalidFileType: 'à¤…à¤®à¤¾à¤¨à¥à¤¯ à¤«à¤¼à¤¾à¤‡à¤² à¤ªà¥à¤°à¤¾à¤°à¥‚à¤ªà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤®à¤¾à¤¨à¥à¤¯ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤¯à¤¾ à¤›à¤µà¤¿ à¤šà¥à¤¨à¥‡à¤‚à¥¤',
      networkError: 'à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤¤à¥à¤°à¥à¤Ÿà¤¿à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤ªà¤¨à¤¾ à¤‡à¤‚à¤Ÿà¤°à¤¨à¥‡à¤Ÿ à¤•à¤¨à¥‡à¤•à¥à¤¶à¤¨ à¤œà¤¾à¤‚à¤šà¥‡à¤‚à¥¤',
      tryAgainLater: 'à¤¸à¤®à¤¯ à¤¸à¤®à¤¾à¤ªà¥à¤¤ à¤¹à¥‹ à¤—à¤¯à¤¾à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤•à¥à¤› à¤ªà¤²à¥‹à¤‚ à¤®à¥‡à¤‚ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
    },
  },
};
