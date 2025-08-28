// This api router will be triggered when any request starting with /api comes
import express from 'express';
import v1Routeruser from './v1/user.js';
import v1Routeradmin from './v1/admin.js';
const router = express.Router();

router.use('/v1/users', v1Routeruser);
router.use('/v1/admin', v1Routeradmin);

export default router;