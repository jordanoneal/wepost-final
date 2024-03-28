import express from 'express';
import { ICreateIncident } from '../../common/incident';
import { IncidentService } from '../services/incident';

const incidentRouter = express.Router();

incidentRouter.route('/')
    .get(async (req, res) => {
        try {
            const response = await IncidentService.getIncidents();
            res.status(200).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })
    .post(async (req, res) => {
        try {
            const params = req.body as ICreateIncident

            const response = await IncidentService.createIncident(params);
            res.status(201).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })

incidentRouter.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const response = await IncidentService.retrieveIncidentById(id);
            res.status(200).json(response);

        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })

export { incidentRouter };