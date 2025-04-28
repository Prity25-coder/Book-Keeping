const translations = {
  en: {
    bookNotFound: "Book not found",
    libraryNotFound: "Library not found",
    userNotFound: "User not found",
    unauthorized: "Unauthorized access",
    bookAdded: "Book added successfully",
    bookUpdated: "Book updated successfully",
    bookDeleted: "Book deleted successfully",
    libraryAdded: "Library added successfully",
    libraryUpdated: "Library updated successfully",
    libraryDeleted: "Library deleted successfully",
    bookBorrowed: "Book borrowed successfully",
    bookReturned: "Book returned successfully",
    userRegistered: "User registered successfully",
    loginSuccess: "Login successful",
    invalidCredentials: "Invalid credentials",
    // Add more translations as needed
  },
  hi: {
    bookNotFound: "पुस्तक नहीं मिली",
    libraryNotFound: "लाइब्रेरी नहीं मिली",
    userNotFound: "उपयोगकर्ता नहीं मिला",
    unauthorized: "अनधिकृत पहुंच",
    bookAdded: "पुस्तक सफलतापूर्वक जोड़ी गई",
    bookUpdated: "पुस्तक सफलतापूर्वक अद्यतन की गई",
    bookDeleted: "पुस्तक सफलतापूर्वक हटाई गई",
    libraryAdded: "लाइब्रेरी सफलतापूर्वक जोड़ी गई",
    libraryUpdated: "लाइब्रेरी सफलतापूर्वक अद्यतन की गई",
    libraryDeleted: "लाइब्रेरी सफलतापूर्वक हटाई गई",
    bookBorrowed: "पुस्तक सफलतापूर्वक उधार ली गई",
    bookReturned: "पुस्तक सफलतापूर्वक वापस की गई",
    userRegistered: "उपयोगकर्ता सफलतापूर्वक पंजीकृत",
    loginSuccess: "लॉगिन सफल",
    invalidCredentials: "अमान्य प्रमाण-पत्र",
    // Add more translations as needed
  },
};

const translate = (key, lang = "en") => {
  return translations[lang]?.[key] || translations["en"][key] || key;
};

export default translate;
