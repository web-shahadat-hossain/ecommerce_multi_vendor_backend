import https from "https";
import fs from "fs";
import expressAsyncHandler from "express-async-handler";

const BASE_HOSTNAME = "storage.bunnycdn.com";
const ACCESS_KEY = "f56f3dd9-c481-4349-8dadcb9f0c1d-f593-4b95";
const STORAGE_ZONE_NAME = "globalit";

export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file attached");
  }

  const file = req.file;
  const filePath = file.path;
  const fileName = encodeURIComponent(file.originalname);

  const readStream = fs.createReadStream(filePath);

  const options = {
    method: "PUT",
    hostname: BASE_HOSTNAME,
    path: `/${STORAGE_ZONE_NAME}/${fileName}`, // Fixed path formatting for Bunny CDN
    headers: {
      AccessKey: ACCESS_KEY, // Correct capitalization
      "Content-Type": "application/octet-stream",
    },
  };

  const reqBunny = https.request(options, (response) => {
    let responseBody = "";

    // Gather the response body in chunks
    response.on("data", (chunk) => {
      responseBody += chunk;
    });

    response.on("end", () => {
      if (response.statusCode === 201 || response.statusCode === 200) {
        // Remove the file after successful upload
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error in removing file:", err);
          else console.log("File removed successfully");
        });

        return res.status(201).json({
          status: true,
          msg: "File uploaded successfully",
          path: `${STORAGE_ZONE_NAME}/${fileName}`, // Path for Bunny CDN
        });
      } else {
        return res.status(response.statusCode).json({
          status: false,
          msg: "File upload failed",
          response: responseBody,
        });
      }
    });
  });

  reqBunny.on("error", (error) => {
    console.error("Bunny CDN Upload Error:", error);

    // Cleanup: Remove the file from local disk if the upload fails
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error in removing file:", err);
    });

    return res.status(500).json({
      status: false,
      msg: "File upload failed",
      error: error.message,
    });
  });

  // Start the upload by piping the file stream
  readStream.pipe(reqBunny);
});

export const deleteFile = expressAsyncHandler(async (req, res) => {
  const url = `https://${BASE_HOSTNAME}/${STORAGE_ZONE_NAME}/${req.params.fileName}`;
  const option = {
    method: "DELETE",
    headers: { AccessKey: ACCESS_KEY },
  };

  try {
    const response = await fetch(url, option);
    if (response.ok) {
      res.status(200).json({ status: true, msg: "File Deleted Successfully" });
    } else {
      const errorText = await response.text();
      res
        .status(200)
        .json({ status: true, msg: `Error in deleting: ${errorText}` });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: "Error in deleting file" });
  }
});
