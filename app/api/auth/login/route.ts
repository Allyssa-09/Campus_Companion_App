import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { email, studentId } = await request.json();

    if (!email || !studentId) {
      return NextResponse.json({ error: "Email and Student ID are required" }, { status: 400 });
    }

    // Read the CSV file
    const filePath = path.join(process.cwd(), "docs", "campus_companion_students.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Simple CSV parser
    const lines = fileContent.split("\n");

    // Find the student in the CSV
    const studentLine = lines.find(line => {
      const columns = line.split(",");
      // columns[0] is student_id, columns[3] is email
      return columns[3] === email && columns[0] === studentId;
    });

    if (!studentLine) {
      return NextResponse.json({ error: "Invalid email or Student ID" }, { status: 401 });
    }

    const studentData = studentLine.split(",");
    
    // Create the user object
    const user = {
      id: studentData[0],
      firstName: studentData[1],
      lastName: studentData[2],
      email: studentData[3],
      role: "Student",
      course: studentData[7],
      timetable: studentData[10], // The raw timetable string
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
