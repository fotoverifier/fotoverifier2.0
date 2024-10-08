import { NextResponse, NextRequest } from "next/server";
import { spawn } from "child_process";

const analyzeImage = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["src/method/placeholder.py"]);

    pythonProcess.stdin.write(buffer.toString("base64"));
    pythonProcess.stdin.end();

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      reject(data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        resolve(result.trim());
      }
    });
  });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData = await req.formData();

  const file = formData.get("image") as File;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  try {
    const result = analyzeImage(buffer);
    return NextResponse.json({ Message: "Success", result, status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
