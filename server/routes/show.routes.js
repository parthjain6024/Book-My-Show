import {Router} from 'express';
import {createShow,listShows, showDetail,bookTicket} from  "../controllers/show.controller.js";
import isLoggedIn from '../middlewares/authentication.js';
import authorizedRoles from '../middlewares/authorization.js';

const router = Router();

router.post('/',isLoggedIn, authorizedRoles('Admin') ,createShow);
router.get('/list',listShows);
router.get('/:showId', showDetail);
router.post('/book/:showId', bookTicket);

export default router;