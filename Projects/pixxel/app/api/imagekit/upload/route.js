import { auth } from "@clerk/nextjs/server"
import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
})

export async function POST(request) {
  console.log("ImageKit API called");
  console.log("Environment variables check:", {
    publicKey: !!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: !!process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: !!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  });
  
  try {
    const {userId} = await auth();
    console.log("User ID:", userId);
    if(!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName");
    
    console.log("File info:", {
      hasFile: !!file,
      fileName: fileName,
      fileSize: file?.size
    });

    if(!file) {
      return NextResponse.json({error: "No file provided"}, {status: 400})
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timeStamp = Date.now()
    const sanitizedFileName = fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
    const uniqueFileName = `${userId}/${timeStamp}_${sanitizedFileName}`

    console.log("Attempting ImageKit upload...");
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: uniqueFileName,
      folder: "/pixxel-projects"
    });
    console.log("Upload successful:", uploadResponse.fileId);

    const thumbnailUrl = imagekit.url({
      src: uploadResponse.url,
      transformation: [
        {
          width: 400,
          height: 300,
          cropMode: "maintain_ar",
          quality: 80
        }
      ]
    })

    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      thumbnailUrl: thumbnailUrl,
      fileId: uploadResponse.fileId,
      width: uploadResponse.width,
      height: uploadResponse.height,
      size: uploadResponse.size,
      name: uploadResponse.name
    })
  } catch (error) {
    console.error("ImageKit upload error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({
      success: false,
      error: "Failed to upload image",
      details: error.message,
    },
  {
    status: 500
  })
  }
}