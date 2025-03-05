// data --------
const KEYS = ['Major(Ionian)', 'Minor(Aeolian)', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Locrian'];
const BASE_NOTES = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];

const MAJOR_ADDED = ['G♭/F♯', 'D♭', 'A♭', 'E♭', 'B♭'];
const MINOR_ADDED = ['F♯', 'C♯', 'G♯', 'E♭/D♯', 'B♭'];
const DORIAN_ADDED = ['F♯', 'C♯', 'A♭/G♯', 'E♭', 'B♭'];
const PHRYGIAN_ADDED = ['F♯', 'C♯', 'G♯', 'D♯', 'B♭/A♯'];
const LYDIAN_ADDED = ['G♭', 'D♭', 'A♭', 'E♭', 'B♭'];
const MIXOLYDIAN_ADDED = ['F♯', 'D♭/C♯', 'A♭', 'E♭', 'B♭'];
const LOCRIAN_ADDED = ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'];

const sharpsFlatsNumber = ['_', '1♯', '2♯', '3♯', '4♯', '5♯', '6b/6♯', '5♭', '4♭', '3♭', '2♭', '1♭'];
const sharps = ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'];
const flats = ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'];

const generateAllKeyNotes = (keyIndex, addedNotes) => {
  const secondPart = BASE_NOTES.slice(0, keyIndex);
  const firstPart = BASE_NOTES.slice(keyIndex, BASE_NOTES.length);
  return [...firstPart, ...addedNotes, ...secondPart];
};

const KEYS_MAP = {
  [KEYS[0]]: generateAllKeyNotes(1, MAJOR_ADDED),
  [KEYS[1]]: generateAllKeyNotes(4, MINOR_ADDED),
  [KEYS[2]]: generateAllKeyNotes(3, DORIAN_ADDED),
  [KEYS[3]]: generateAllKeyNotes(5, PHRYGIAN_ADDED),
  [KEYS[4]]: generateAllKeyNotes(0, LYDIAN_ADDED),
  [KEYS[5]]: generateAllKeyNotes(2, MIXOLYDIAN_ADDED),
  [KEYS[6]]: generateAllKeyNotes(6, LOCRIAN_ADDED),
}
// ----------------------------

let selectedKey = KEYS[0];

const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const selectedKeySpan = document.getElementById("selected-key");
const notesSection = document.getElementById('notes');



const onClickItem = (key) => {
  selectedKey = key;
  updateDropdownMenuHTML();
  updateNotesSection();
}

const updateDropdownMenuHTML = () => {
  dropdownMenu.innerHTML = KEYS.map((key) => `<div 
    class="block px-4 py-2 hover:bg-blue-100 cursor-pointer 
    ${key === selectedKey ? 'text-blue-500 font-semibold' : 'text-gray-700'}" 
    data-key="${key}">${key}</div>`).join('');
  selectedKeySpan.innerText = selectedKey;
}

updateDropdownMenuHTML();

const getTooltipText = (index) => {
  if (index === 6) {
    return `<div class="flex flex-col gap-1">
              <div>${flats.join(', ')}</div>
                <div class="w-full justify-center flex">--</div>
              <div>${sharps.join(', ')}</div>
            </div>`
  } else if (index < 6) {
    return sharps.slice(0, index).join(', ');
  } else if (index > 6) {
    return flats.slice(0, 12 - index).join(', ');
  }
}

const updateNotesSection = () => {
  notesSection.innerHTML = KEYS_MAP[selectedKey].map((key, index) => {
    const angle = index * 30 * (Math.PI / 180)
    const x = 200 * Math.sin(angle)
    const y = -200 * Math.cos(angle)
    return (
      `<div
        class="absolute"
        style="left: calc(50% + ${x}px);
          top: calc(50% + ${y}px);
          transform: translate(-50%, -50%);"
      >
        <div class="relative group">
          <div
            class="w-14 h-14 rounded-full flex cursor-default items-center justify-center transition-all duration-300 hover:scale-110 bg-gray-100 text-secondary-foreground"
          >
            <div class="text-center">
              <div class="font-bold">${key}</div>
              <div class="text-xs">${sharpsFlatsNumber[index]}</div>
            </div>
          </div>
          ${index !== 0 ? `<div class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block 
                    bg-gray-100 text-black text-sm rounded-md px-3 py-2 w-max text-center shadow-lg">
            ${getTooltipText(index)}
          </div>` : ''}
        </div>
      </div>`
    )
  }).join('')
}

updateNotesSection();

dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

dropdownMenu.addEventListener("click", (event) => {
  const clickedItem = event.target.closest("div[data-key]");
  if (clickedItem) {
    onClickItem(clickedItem.getAttribute("data-key"));
  }
});

document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
    }
});