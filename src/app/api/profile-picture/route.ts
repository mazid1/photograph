import { getStore } from "@netlify/blobs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  try {
    if (!userId) {
      return NextResponse.json({
        message: "User ID is required",
        success: false,
      });
    }
    const profilePictureStore = getStore("profile-picture");
    const pictureWithMetadata = await profilePictureStore.getWithMetadata(
      userId,
      { type: "arrayBuffer" }
    );

    if (!pictureWithMetadata) {
      return NextResponse.json({
        message: "Profile picture not found",
        success: false,
      });
    }

    const profilePicture = pictureWithMetadata?.data as ArrayBuffer;
    const fileName = pictureWithMetadata?.metadata.fileName;

    return new NextResponse(profilePicture, {
      headers: { "Content-Disposition": `attachment; filename="${fileName}"` },
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to get profile picture",
      success: false,
    });
  }
}
