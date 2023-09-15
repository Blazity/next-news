import {google} from "googleapis"


const jwt = new google.auth.JWT()
const analytics = google.analyticsreporting("v4")

function run() {

    await jwt.authorize()
    analytics.reports.batchGet({
        ...
    })
}