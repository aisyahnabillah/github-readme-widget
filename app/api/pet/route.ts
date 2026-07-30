import { getGitHubStats } from "@/lib/github";
import { getPetState } from "@/lib/pet";
import { ASSETS } from "@/lib/assets";

export async function GET() {
  // Get the user's current GitHub contribution streak
  const stats = await getGitHubStats("aisyahnabillah");

  // Choose the cat based on the current streak
  const pet = getPetState(stats.currentStreak);

  // Generate the SVG widget
  const svg = `
    <svg
      width="330"
      height="330"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background -->
      <rect
        width="100%"
        height="100%"
        fill="none"
      />

      <!-- Cat -->
      <image
        href="${pet.asset}"
        x="30"
        y="90"
        width="250"
        height="250"
      />
      <!-- Fish -->
      <image
        href="${ASSETS.fish}"
        x="33"
        y="20"
        width="250"
        height="110"
      />
      <!-- Commit streak title -->
      <text
        x="70"
        y="70"
        fill="white"
        font-size="16"
        font-weight="bold"
        font-family="Arial, sans-serif"
      >
        Commit Streak
      </text>

      <!-- Commit streak number -->
      <text
        x="90"
        y="105"
        fill="white"
        font-family="Arial, sans-serif"
      >
        <tspan
          font-size="32"
          font-weight="bold"
        >
          ${stats.currentStreak}
        </tspan>

        <tspan
          font-size="16"
          font-weight="bold"
        >
          Days
        </tspan>
      </text>
    </svg>
  `;

  // Return the SVG as an image response
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
