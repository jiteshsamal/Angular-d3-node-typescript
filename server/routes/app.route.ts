import {Request, Response,Application} from "express";
import {marketPositions,dataArray} from './route-data'


export class Routes {       
    public routes(app:Application): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        app.route('/market')
        .get((req: Request, res: Response) => {            
            res.status(200).send(marketPositions)
        })
        app.route('/compareData')
        .get((req: Request, res: Response) => {            
            res.status(200).send(dataArray)
        })
    }
}