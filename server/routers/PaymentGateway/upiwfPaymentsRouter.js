const express = require("express");
const { addWalletMoneyUsingPG, createOrderToAddWalletMoney, createOrder, webhook_two, webhook, createOrderToBuyUserId, BuyUserIdUsingPGVerify, userRegiserOnline, userRegiserOnlinePGVerify } = require("../../controllers/PaymentGateway/upiwfPayments");
const router = express.Router();

router.post("/webhook" ,webhook )
router.get("/webhooktwo" ,webhook_two )
router.post("/createOrder" ,createOrder )
router.post("/createOrderToAddWalletMoney" ,createOrderToAddWalletMoney )
router.get("/addWalletMoneyUsingPG" ,addWalletMoneyUsingPG )
router.post("/createOrderToBuyUserId" ,createOrderToBuyUserId )
router.get("/BuyUserIdUsingPGVerify" ,BuyUserIdUsingPGVerify )
router.post("/userRegiserOnline" , userRegiserOnline)
router.get("/userRegiserOnlinePGVerify" , userRegiserOnlinePGVerify)

module.exports = router;