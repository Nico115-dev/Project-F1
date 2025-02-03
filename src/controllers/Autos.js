

const races = [
    {
      round: "TESTING",
      type: "testing",
      dates: "26-28",
      month: "FEB",
      country: "Sakhir",
      flag: "🇧🇭",
      title: "FORMULA 1 ARAMCO PRE-SEASON",
      subtitle: "TESTING 2025",
      circuitImage: "../img/Qatar carbon.avif",
    },
    {
      round: "ROUND 1",
      type: "race",
      dates: "14-16",
      month: "MAR",
      country: "Australia",
      flag: "🇦🇺",
      title: "FORMULA 1 LOUIS VUITTON AUSTRALIAN",
      subtitle: "GRAND PRIX 2025",
      circuitImage: "../img/Australia carbon.avif",
    },
    {
      round: "ROUND 2",
      type: "race",
      dates: "21-23",
      month: "MAR",
      country: "China",
      flag: "🇨🇳",
      title: "FORMULA 1 HEINEKEN CHINESE GRAND",
      subtitle: "PRIX 2025",
      circuitImage: "../img/China carbon.avif",
    },
    {
      round: "ROUND 3",
      type: "race",
      dates: "04-06",
      month: "APR",
      country: "Japan",
      flag: "🇯🇵",
      title: "FORMULA 1 LENOVO JAPANESE GRAND",
      subtitle: "PRIX 2025",
      circuitImage: "../img/Japan carbon.avif",
    },
    {
      round: "ROUND 4",
      type: "race",
      dates: "11-13",
      month: "APR",
      country: "Bahrain",
      flag: "🇧🇭",
      title: "FORMULA 1 BAHRAIN GRAND PRIX 2025",
      subtitle: "",
      circuitImage: "../img/Bahrain carbon.avif",
    },
    {
      round: "ROUND 5",
      type: "race",
      dates: "18-20",
      month: "APR",
      country: "Saudi Arabia",
      flag: "🇸🇦",
      title: "FORMULA 1 STC SAUDI ARABIAN GRAND",
      subtitle: "PRIX 2025",
      circuitImage: "../img/Saudi Arabia carbon.avif",
    },
    {
      round: "ROUND 6",
      type: "race",
      dates: "02-04",
      month: "MAY",
      country: "Miami",
      flag: "🇺🇸",
      title: "FORMULA 1 CRYPTO.COM MIAMI GRAND",
      subtitle: "PRIX 2025",
      circuitImage: "../img/Miami carbon.avif",
    },
    {
      round: "ROUND 7",
      type: "race",
      dates: "16-18",
      month: "MAY",
      country: "Emilia-Romagna",
      flag: "🇮🇹",
      title: "FORMULA 1 AWS GRAN PREMIO DEL",
      subtitle: "MADE IN ITALY E DELL&apos;EMILIA-ROMAGNA 2025",
      circuitImage: "../img/Australia carbon.png",
    },
  ]
  
  function createRaceCard(race) {
    return `
          <div class="race-card">
              <div class="race-info">
                  <div class="race-header">
                      <div>
                          <div class="race-round">${race.round}</div>
                          <div class="race-dates">
                              ${race.dates}
                              <span class="race-month">${race.month}</span>
                          </div>
                      </div>
                      <div class="race-flag">${race.flag}</div>
                  </div>
                  <div class="race-country">${race.country} ></div>
                  <div class="race-title">
                      ${race.title}<br>${race.subtitle}
                  </div>
              </div>
              <div class="race-circuit">
                  <div class="circuit-grid"></div>
                  <div class="circuit-image" style="background-image: url('${race.circuitImage}')"></div>
              </div>
          </div>
      `
  }
  
  function renderRaces() {
    const raceGrid = document.getElementById("raceGrid")
    raceGrid.innerHTML = races.map(createRaceCard).join("")
  }
  
  document.addEventListener("DOMContentLoaded", renderRaces)