import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  // localhost:3000/api/check-username-unique?username=exampleUser
  // queryParam = { username: "exampleUser" }
  try {
    // extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    console.log(searchParams) // URLSearchParams { 'username' => 'one' }

    
    const queryParam = {
      username: searchParams.get("username"),
    };
    // console.log("Query Param:" , queryParam) // { username: 'one' }

    const result = UsernameQuerySchema.safeParse(queryParam);
    // console.log(result); // { success: true, data: { username: 'one' } }
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    // console.log(username); // 'one'
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is alreday taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Checking Unique Username:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking unique username",
      },
      { status: 500 }
    );
  }
}
