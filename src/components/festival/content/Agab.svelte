<script>
  import { onMount } from "svelte";

  export let wordsetdisplay;

  const wordSets = [
    ["Agile", "Goose", "Asks", "Boldly"],
    ["Artsy", "Giraffe", "Admires", "Bubbles"],
    ["Awkward", "Gorilla", "Acts", "Baffled"],
    ["Athletic", "Gazelle", "Attempts", "Backflips"],
    ["Amusing", "Gopher", "Announces", "Banquet"],
    ["Animated", "Gnome", "Arranges", "Birthday"],
    ["Angelic", "Ghost", "Appears", "Befuddled"],
    ["Aquatic", "Guppy", "Acts", "Bubbly"],
    ["Anxious", "Gazpacho", "Awaits", "Breadsticks"],
    ["Alluring", "Garnet", "Adorns", "Ballerina"],
    ["Ancient", "Griffin", "Admires", "Blossom"],
    ["Active", "Gecko", "Announces", "BeachDay"],
    ["Alert", "Grouse", "Avoids", "Bears"],
    ["Adaptable", "GuineaPig", "Accepts", "Broccoli"],
    ["Artistic", "Gull", "Assembles", "BeachGlass"],
    ["Amiable", "GhostCrab", "Adores", "Bubbles"],
    ["Adventurous", "Gnome", "Attempts", "Ballet"],
    ["Amused", "Goldfinch", "Appreciates", "Birdsong"],
    ["Attractive", "Gargoyle", "Adorns", "Building"],
    ["Ambitious", "Garland", "Ascends", "Balcony"],
    ["Aglow", "Glowworm", "Admires", "Beacons"],
    ["Authentic", "Gourd", "Admits", "Beauty"],
    ["Asleep", "Gopher", "Awaits", "Breakfast"],
    ["Awake", "Grasshopper", "Admires", "Butterflies"],
    ["Accurate", "GeigerCounter", "Analyzes", "BetaRays"],
    ["Agile", "Gymnast", "Achieves", "Balance"],
    ["Amusing", "Gargoyle", "Attempts", "Beatbox"],
    ["Aloof", "Gazelle", "Admires", "Butterflies"],
    ["Aquatic", "Guppy", "Acts", "Bouncy"],
    ["Airy", "Gull", "Asks", "Breeze"],
    ["Afraid", "Ghost", "Avoids", "BrightLights"],
    ["Angry", "Grizzly", "Attacks", "Beehive"],
    ["Astonished", "Goat", "Answers", "Buzzer"],
    ["Admiring", "Giraffe", "Appreciates", "BlueSky"],
    ["Adept", "Gamer", "Achieves", "BossLevel"],
    ["Awesome", "Guitars", "Amplifies", "Beat"],
    ["Amused", "Gremlin", "Attempts", "Badminton"],
    ["Astute", "Geologist", "Analyzes", "Bedrock"],
    ["Apprehensive", "Groundhog", "Awaits", "Blizzard"],
    ["Amorous", "Gazelle", "Admires", "Buck"],
    ["Assigned", "Gay", "At", "Band"],
  ];

  let currentSetIndex = 0;

  function updateWords() {
    wordsetdisplay = wordSets[currentSetIndex].join(" ");
    currentSetIndex = (currentSetIndex + 1) % wordSets.length;
  }

  onMount(() => {
    setInterval(updateWords, 5000);
  });
</script>

<p class="text">{wordsetdisplay}</p>

<style>
  .text {
    width: 100%;
    text-align: center;
  }
</style>
