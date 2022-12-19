import { activatePictures } from "./gallery.js";
import { activateUploadFile } from "./post_upload.js";
import { getData } from "./server_requests.js";

getData(activatePictures);
activateUploadFile();
