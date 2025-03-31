const express = require("express")
const { signup } = require("../controllers/authController")
const { login } = require("../controllers/loginController")
const { createEvent } = require("../controllers/addEventController")
const { getAllUsers } = require("../controllers/userController")
const { getUserAvailability, updateAvailability, deleteTimeSlot } = require("../controllers/availabilityController")
const { getUserMeetings, updateMeetingStatus } = require("../controllers/bookingController")
const { getCurrentUser } = require("../controllers/layoutController")
const { getUserMeetings: getEvents, updateAttendance } = require("../controllers/eventsController")
const { updatePreferences } = require("../controllers/preferenceController")
const { getUserSettings, updateUserSettings, deleteUserAccount } = require("../controllers/settingsController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

// Signup Route
router.post("/signup", signup)

// Login Route
router.post("/login", login)

// Create Event Route
// router.post("/create", createEvent)

// Get All Users Route (for fetching emails)
router.get("/users", getAllUsers)

// Current User Route (protected)
router.get("/current-user", authMiddleware, getCurrentUser)

// Availability Routes (protected)
router.get("/availability", authMiddleware, getUserAvailability)
router.post("/availability", authMiddleware, updateAvailability)
router.delete("/availability/:day/:slotIndex", authMiddleware, deleteTimeSlot)

// Booking Routes (protected)
router.get("/meetings", authMiddleware, getUserMeetings)
router.post("/meetings/status", authMiddleware, updateMeetingStatus)

// Events Routes (protected)
router.get("/events", authMiddleware, getEvents)
router.post("/events/attendance", authMiddleware, updateAttendance)

// Preferences Route (protected)
router.post("/preferences", authMiddleware, updatePreferences)

// Settings Routes (protected)
router.get("/settings", authMiddleware, getUserSettings)
router.put("/settings", authMiddleware, updateUserSettings)
router.delete("/account", authMiddleware, deleteUserAccount)

router.post("/create", authMiddleware, createEvent)

module.exports = router

