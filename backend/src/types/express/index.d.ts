import {Request as IRequest, Response as IResponse} from "express/index";

declare module "express-serve-static-core" {
    namespace Express {
        interface Request {
            user: {
                firstname: string
                lastname: string
                userType: string
                _id: string,
            },
            company: {
                companysEmail: string
                hotel_logo_url: string
                hotel_name: string
                hotel_phone: string
            },
            licenseDetails: string
            file: any,
            timedOut: any
        }
        interface Response {
            company: {
                companysEmail: string
                hotel_logo_url: string
                hotel_name: string
                hotel_phone: string
            },
        }
    }
}