import {isValidUrl} from "../utils/isValidUrl.js";
import Link from "../models/Link.js";

export const createLink = async (req, res) => {
    const { url } = req.body;

    const protocol = req.protocol;
    const host = req.headers.host;
    if(!isValidUrl(url)){
        res.status(400).json({
            success: false,
            message: 'Link is not valid'
        });
        return;
    }

    let shortLinkPath = Math.random().toString(36).slice(2, 9);
    let isPathExists = await Link.findOne({shortLinkPath});

    while(isPathExists){
        shortLinkPath = Math.random().toString(36).slice(2, 9);
        isPathExists = await Link.findOne({shortLinkPath});
    }

    await Link.create({
        shortLinkPath,
        fullLink: url
    });

    res.status(201).json({
        link: `${protocol}://${host}/${shortLinkPath}`
    });
};

export const redirectLink = async (req, res) => {
    const { path } = req.params;

    let link = await Link.findOne({shortLinkPath: path});
    if(!link){
        res.status(404).json({
            success: false,
            message: 'Path is not exists'
        });
        return;
    }

    res.redirect(link.fullLink);
};