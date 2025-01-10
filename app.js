import express from 'express'
import cors from 'cors'
import * as OpenApiValidator from 'express-openapi-validator'
import * as url from 'url'
import path from 'path'
import 'dotenv/config'

import EnterpriseRouter from './API/routers/enterprise.router.js'
import GymRouter from './API/routers/gym.router.js'
import ManagerRouter from './API/routers/manager.router.js'
import UserRouter from './API/routers/user.router.js'
import SubscriptionRouter from './API/routers/subscription.router.js'
import BadgeRouter from './API/routers/badge.router.js'
import StatRouter from './API/routers/stat.router.js'
import UserBadgeRouter from './API/routers/userBadge.router.js'

import {errorHandler} from './middlewares/errorHandler.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(OpenApiValidator.middleware({
    apiSpec: __dirname + '/openapi-main.yaml',
    ignoreUndocumented: true,
}))

app.use('/api', UserRouter);
app.use('/api', EnterpriseRouter);
app.use('/api', GymRouter);
app.use('/api', ManagerRouter);
app.use('/api', SubscriptionRouter);
app.use('/api', BadgeRouter);
app.use('/api', StatRouter);
app.use('/api', UserBadgeRouter);

app.use(errorHandler);

export default app