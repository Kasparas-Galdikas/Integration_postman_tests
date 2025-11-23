module.exports = {
  // ------------------------------------------------------------
  // 1) Pilnas end-to-end vartotojo scenarijus
  // ------------------------------------------------------------
  full_user_flow: [
    "positive - register - userRegister",
    "positive - login - userLogin",
    "positive - user - getUser",
    "positive - user - getUsers",
    "positive - user - deleteUser",
    "negative - user - getUserNotFoundAfterDelete",
    "positive - user - logout",
    "negative - login - invalidAfterDelete"   // <-- Login again should fail
  ],

  // ------------------------------------------------------------
  // 2) REGISTER API scenarijai
  // ------------------------------------------------------------

  // Pozityvi registracija + GET patvirtinimas
  register_happy_path: [
    "positive - register - userRegister",
    "positive - user - getUser"
  ],

  // Registracija → duplicate username (400)
  register_duplicate: [
    "positive - register - userRegister",
    "negative - register - duplicate"
  ],

  // Visi blogi registracijos input scenarijai
  register_invalid_inputs: [
    "negative - register - invalidUsername",
    "negative - register - invalidEmail",
    "negative - register - shortPassword",
    "negative - register - missingField",
    "negative - register - wrongContentType",
    "negative - register - emptyBody"
  ],

  // ------------------------------------------------------------
  // 3) LOGIN API scenarijai
  // ------------------------------------------------------------

  login_happy_path: [
    "positive - login - userLogin"
  ],

  // Neigiami login scenarijai (401 / 500)
  login_invalid_cases: [
    "negative - login - invalid",
    "negative - login - missingField",
  ],

  // ------------------------------------------------------------
  // 4) USER GET scenarijai
  // ------------------------------------------------------------

  user_get_flow: [
    "positive - user - getUser"
  ],

  user_get_not_found: [
    "negative - user - getUserNotFound"
  ],

  // ------------------------------------------------------------
  // 5) USER LIST scenarijai
  // ------------------------------------------------------------

  user_list_flow: [
    "positive - user - getUsers"
  ],

  // ------------------------------------------------------------
  // 6) DELETE user scenarijai
  // ------------------------------------------------------------

  // delete → verify 404
  delete_and_verify_404: [
    "positive - user - deleteThenGet404"
  ],

  delete_user_not_found: [
    "negative - user - deleteUserNotFound"
  ],

  // ------------------------------------------------------------
  // 7) LOGOUT scenarijus
  // ------------------------------------------------------------

  logout_flow: [
    "positive - user - logout"
  ]
};
