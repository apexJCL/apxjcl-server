import { Request, Response } from 'express'
import { Entry } from "../models/entry.model"

export class EntryController {
    /**
     * Adds an entry to the database
     * @param {e.Request} req
     * @param {Response} res
     */
    addEntry(req: Request, res: Response) {
        const entry = new Entry(req.body);
        entry.save()
            .then((entry) => {
                return res.json({
                    success: true,
                    entry
                });
            })
            .catch((error) => {
                return res.status(500).send(error);
            });
    }

    getEntries(req: Request, res: Response) {
        Entry.find()
            .then((entries: any) => {
                return res.json({
                    page: 1, // TODO: implement pagination?
                    entries
                });
            })
            .catch((err) => {
                return res.send(err);
            })
    }

    getEntry(req: Request, res: Response) {
        Entry.findOne({
            _id: req.params.entryId
        }).then((entry) => {
            return res.json(entry);
        }).catch((err) => {
            return res.send(err);
        })
    }
}