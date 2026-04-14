import "./style.css";
import type {
  Character,
  ClassName,
  Class,
  SubclassName as Subclass,
  Ancestry,
  Community,
  InventoryItem,
  Skill,
} from "./domain/types/index";
import type { CharacterRepository } from "./domain/characterRepository";
import { createNewCharacter } from "./domain/defaults";
import { IndexedDbCharacterRepository } from "./repository/indexedDbCharacterRepository";

const CLASS_OPTIONS: ClassName[] = [
  "",
  "Bard",
  "Druid",
  "Guardian",
  "Ranger",
  "Rogue",
  "Seraph",
  "Sorcerer",
  "Warrior",
  "Wizard",
];

const ANCESTRY_OPTIONS: Ancestry[] = [
  "",
  "Clank",
  "Drakona",
  "Dwarf",
  "Elf",
  "Faerie",
  "Faun",
  "Firbolg",
  "Fungril",
  "Galapa",
  "Giant",
  "Goblin",
  "Halfling",
  "Human",
  "Infernis",
  "Katari",
  "Orc",
  "Ribbet",
  "Simiah",
];

const COMMUNITY_OPTIONS: Community[] = [
  "",
  "Highborne",
  "Loreborne",
  "Orderborne",
  "Ridgeborne",
  "Seaborne",
  "Slyborne",
  "Underborne",
  "Wanderborne",
  "Wildborne",
];

const SUBCLASSES_BY_CLASS: Record<ClassName, readonly Subclass[]> = {
  "": [""],
  Bard: ["", "Troubadour", "Wordsmith"],
  Druid: ["", "Warden of Renewal", "Warden of the Elements"],
  Guardian: ["", "Stalwart", "Vengeance"],
  Ranger: ["", "Wayfinder", "Beastbound"],
  Rogue: ["", "Syndicate", "Nightwalker"],
  Seraph: ["", "Divine Wielder", "Winged Sentinel"],
  Sorcerer: ["", "Elemental Origin", "Primal Origin"],
  Warrior: ["", "Call of the Brave", "Call of the Slayer"],
  Wizard: ["", "School of Knowledge", "School of War"],
};

function fillSelect<T extends string>(
  select: HTMLSelectElement,
  options: readonly T[],
) {
  select.innerHTML = options
    .map((o) => `<option value="${o}">${o === "" ? "(keine)" : o}</option>`)
    .join("");
}

function subclassesFor(className: ClassName): readonly Subclass[] {
  return SUBCLASSES_BY_CLASS[className] ?? [""];
}

function refreshSubclassOptions(
  selectedClass: ClassName,
  keepValue?: Subclass,
) {
  const options = subclassesFor(selectedClass);
  fillSelect(fSubclass, options);

  const desired = (keepValue ?? (fSubclass.value as Subclass)) || "";
  const allowed = options.includes(desired);
  fSubclass.value = allowed ? desired : "";
}

const repo: CharacterRepository = new IndexedDbCharacterRepository();

let characters: Character[] = [];
let selectedId: string | null = null;

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="layout">
    <aside class="sidebar">
      <div class="toolbar">
        <button id="btnNew">Neu</button>
      </div>
      <div id="list"></div>
    </aside>

    <main class="editor">
      <div id="editorEmpty">Wähle links einen Charakter oder erstelle einen neuen.</div>
      <form id="editorForm" class="hidden" >
        <h2>Charakter</h2>
        <label>
          Name
          <input id="fName" type="text" />
        </label>

        <label>
          Klasse
          <select id="fClass" ></select>
        </label>

        <label>
          Subklasse
          <select id="fSubclass"></select>
        </label>

        <label>
          Rasse
          <select id="fAncestry"></select>
        </label>

        <label>
          Gesellschaft
          <select id="fCommunity"></select>
        </label>

        <label>
          Level
          <input id="fLevel" type="number" min="1" />
        </label>

        <h3>Attribute</h3>
        <div class="grid2">
          <label>Strength <input id="aStrength" type="number"/></label>
          <label>Agility <input id="aAgility" type="number" /></label>
          <label>Presence <input id="aPresence" type="number" /></label>
          <label>Knowledge <input id="aKnowledge" type="number" /></label>
          <label>Instinct <input id="aInstinct" type="number" /></label>
          <label>Endurance <input id="aEndurance" type="number" /></label>
        </div>

        <h3>Ressourcen</h3>
        <div class="grid2">
          <label>Hope (cur) <input id="hopeCur" type="number" /></label>
          <label>Hope (max) <input id="hopeMax" type="number" /></label>

          <label>Stress (cur) <input id="stressCur" type="number" /></label>
          <label>Stress (max) <input id="stressMax" type="number" /></label>

          <label>HP (cur) <input id="hpCur" type="number" /></label>
          <label>HP (max) <input id="hpMax" type="number" /></label>

          <label>Armor used <input id="armorUsed" type="number" /></label>
          <label>Armor max <input id="armorMax" type="number" /></label>

          <label>Minor Threshold <input id="thMinor" type="number" /></label>
          <label>Major Threshold <input id="thMajor" type="number" /></label>
        </div>
        
        
        <h3>Fähigkeiten</h3>
        <h4>Aktive Fähigkeiten</h4>
        <div class="toolbar">
          <button id="btnAddActiveSkill" type="button">Aktive Fähigkeit hinzufügen</button>
        </div>
        <div id="activeSkillsList"></div>

        <h4>Fähigkeiten-Vault</h4>
        <div class="toolbar">
          <button id="btnAddSkillVault" type="button">Vault-Fähigkeit hinzufügen</button>
        </div>
        <div id="skillVaultList"></div>

        <h3>Inventar</h3>
        <div class="grid2">
          <label>
            Slots Total
            <input id="invSlotsTotal" type="number" min="0" />
          </label>

          <label>
            Active Limit
            <input id="invActiveLimit" type="number" min="0" />
          </label>
        </div>

        <div class="toolbar">
          <button id="btnAddItem" type="button">Item hinzufügen</button>
        </div>

        <div id="invList"></div>
        <div class="buttons">
          <button id="btnSave" type="submit">Speichern</button>
          <button id="btnDelete" type="button">Löschen</button>
        </div>
      </form>
    </main>
  </div>
`;

const elList = document.querySelector<HTMLDivElement>("#list")!;
const btnNew = document.querySelector<HTMLButtonElement>("#btnNew")!;
const editorEmpty = document.querySelector<HTMLDivElement>("#editorEmpty")!;
const editorForm = document.querySelector<HTMLFormElement>("#editorForm")!;
const btnDelete = document.querySelector<HTMLButtonElement>("#btnDelete")!;

// Core
const fName = document.querySelector<HTMLInputElement>("#fName")!;
const fClass = document.querySelector<HTMLSelectElement>("#fClass")!;
const fSubclass = document.querySelector<HTMLSelectElement>("#fSubclass")!;
const fAncestry = document.querySelector<HTMLSelectElement>("#fAncestry")!;
const fCommunity = document.querySelector<HTMLSelectElement>("#fCommunity")!;
const fLevel = document.querySelector<HTMLInputElement>("#fLevel")!;

// Stats
const aStrength = document.querySelector<HTMLInputElement>("#aStrength")!;
const aAgility = document.querySelector<HTMLInputElement>("#aAgility")!;
const aPresence = document.querySelector<HTMLInputElement>("#aPresence")!;
const aKnowledge = document.querySelector<HTMLInputElement>("#aKnowledge")!;
const aInstinct = document.querySelector<HTMLInputElement>("#aInstinct")!;
const aEndurance = document.querySelector<HTMLInputElement>("#aEndurance")!;

// Hope, Stress, HP, Armor, Threshhold
const hopeCur = document.querySelector<HTMLInputElement>("#hopeCur")!;
const hopeMax = document.querySelector<HTMLInputElement>("#hopeMax")!;
const stressCur = document.querySelector<HTMLInputElement>("#stressCur")!;
const stressMax = document.querySelector<HTMLInputElement>("#stressMax")!;
const hpCur = document.querySelector<HTMLInputElement>("#hpCur")!;
const hpMax = document.querySelector<HTMLInputElement>("#hpMax")!;
const armorUsed = document.querySelector<HTMLInputElement>("#armorUsed")!;
const armorMax = document.querySelector<HTMLInputElement>("#armorMax")!;
const thMinor = document.querySelector<HTMLInputElement>("#thMinor")!;
const thMajor = document.querySelector<HTMLInputElement>("#thMajor")!;

// Inventar
const invSlotsTotal =
  document.querySelector<HTMLInputElement>("#invSlotsTotal")!;
const invActiveLimit =
  document.querySelector<HTMLInputElement>("#invActiveLimit")!;
const btnAddItem = document.querySelector<HTMLButtonElement>("#btnAddItem")!;
const invList = document.querySelector<HTMLDivElement>("#invList")!;

// Vault
const btnAddActiveSkill =
  document.querySelector<HTMLButtonElement>("#btnAddActiveSkill")!;
const activeSkillsList =
  document.querySelector<HTMLDivElement>("#activeSkillsList")!;

const btnAddSkillVault =
  document.querySelector<HTMLButtonElement>("#btnAddSkillVault")!;
const skillVaultList =
  document.querySelector<HTMLDivElement>("#skillVaultList")!;

fillSelect(fClass, CLASS_OPTIONS);
fillSelect(fAncestry, ANCESTRY_OPTIONS);
fillSelect(fCommunity, COMMUNITY_OPTIONS);

refreshSubclassOptions("" as ClassName, "" as Subclass);

function setEditorVisible(visible: boolean) {
  editorEmpty.classList.toggle("hidden", visible);
  editorForm.classList.toggle("hidden", !visible);
}

function renderList() {
  if (characters.length === 0) {
    elList.innerHTML = `<p class="muted">Noch keine Charaktere.</p>`;
    return;
  }

  elList.innerHTML = characters
    .map((c) => {
      const active = c.id === selectedId ? "active" : "";
      const title = `${c.core.name || "(ohne Name)"} (Lvl ${c.core.level})`;
      return `<button class="listItem ${active}" data-id="${c.id}">${title}</button>`;
    })
    .join("");

  elList
    .querySelectorAll<HTMLButtonElement>("button.listItem")
    .forEach((btn) => {
      btn.addEventListener("click", () => selectCharacter(btn.dataset.id!));
    });
}

function renderInventory(items: InventoryItem[]) {
  if (items.length === 0) {
    invList.innerHTML = `<p class="muted">Noch keine Items.</p>`;
    return;
  }

  invList.innerHTML = `
    <div class="row small">
      <div>Name</div>
      <div>Slots</div>
      <div class="center">Active</div>
      <div>Notiz</div>
      <div></div>
    </div>
    ${items
      .map(
        (it) => `
      <div class="row" data-id="${it.id}">
        <input data-field="name" type="text" value="${escapeHtml(it.name)}" />
        <input data-field="slotSize" type="number" min="0" value="${it.slotSize}" />
        <div class="center">
          <input data-field="active" type="checkbox" ${it.active ? "checked" : ""} />
        </div>
        <input data-field="note" type="text" value="${escapeHtml(it.note)}" />
        <button data-action="delete" type="button">Löschen</button>
      </div>
    `,
      )
      .join("")}
  `;

  // Delete-Handler pro Row
  invList
    .querySelectorAll<HTMLButtonElement>('button[data-action="delete"]')
    .forEach((btn) => {
      btn.addEventListener("click", async () => {
        const row = btn.closest<HTMLDivElement>(".row[data-id]");
        if (!row) return;
        row.remove();
        // Wir löschen nur aus dem DOM – gespeichert wird beim Klick auf "Speichern"
      });
    });
}

// minimale HTML-Escapes, damit Sonderzeichen dein HTML nicht zerschießen
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fillForm(c: Character) {
  //Core
  fName.value = c.core.name ?? "";
  fClass.value = c.core.className ?? "";
  refreshSubclassOptions(fClass.value as ClassName, c.core.subclassName ?? "");
  fAncestry.value = c.core.ancestryName ?? "";
  fCommunity.value = c.core.community ?? "";
  fLevel.value = String(c.core.level ?? 1);

  // Attributes
  aStrength.value = String(c.stats.attributes.strength ?? 0);
  aAgility.value = String(c.stats.attributes.agility ?? 0);
  aPresence.value = String(c.stats.attributes.presence ?? 0);
  aKnowledge.value = String(c.stats.attributes.knowledge ?? 0);
  aInstinct.value = String(c.stats.attributes.instinct ?? 0);
  aEndurance.value = String(c.stats.attributes.endurance ?? 0);

  // Stats
  hopeCur.value = String(c.stats.hope.current ?? 0);
  hopeMax.value = String(c.stats.hope.max ?? 0);
  stressCur.value = String(c.stats.stress.current ?? 0);
  stressMax.value = String(c.stats.stress.max ?? 0);
  hpCur.value = String(c.stats.hp.current ?? 0);
  hpMax.value = String(c.stats.hp.max ?? 0);
  armorUsed.value = String(c.stats.armor.currentUsed ?? 0);
  armorMax.value = String(c.stats.armor.max ?? 0);
  thMinor.value = String(c.stats.damageThreshold.minorthreshold ?? 0);
  thMajor.value = String(c.stats.damageThreshold.majorthreshold ?? 0);

  // Inventory
  invSlotsTotal.value = String(c.inventory.slotsTotal ?? 0);
  invActiveLimit.value = String(c.inventory.activeLimit ?? 0);
  renderInventory(c.inventory.items ?? []);

  // Vault
  renderSkillRefs(
    activeSkillsList,
    c.skills.activeSkills ?? [],
    "Noch keine aktiven Fähigkeiten.",
  );
  renderSkillRefs(
    skillVaultList,
    c.skills.vault ?? [],
    "Noch keine Vault-Fähigkeiten.",
  );
}

function readFormInto(c: Character): Character {
  const level = Number(fLevel.value);

  return {
    ...c,
    core: {
      ...c.core,
      name: fName.value.trim(),
      className: fClass.value as ClassName,
      subclassName: fSubclass.value as Subclass,
      ancestryName: fAncestry.value as Ancestry,
      community: fCommunity.value as Community,
      level: Number.isFinite(level) && level > 0 ? level : 1,
    },
    stats: {
      ...c.stats,
      attributes: {
        ...c.stats.attributes,
        strength: Number(aStrength.value) || 0,
        agility: Number(aAgility.value) || 0,
        presence: Number(aPresence.value) || 0,
        knowledge: Number(aKnowledge.value) || 0,
        instinct: Number(aInstinct.value) || 0,
        endurance: Number(aEndurance.value) || 0,
      },
      hope: {
        current: Number(hopeCur.value) || 0,
        max: Number(hopeMax.value) || 0,
      },
      stress: {
        current: Number(stressCur.value) || 0,
        max: Number(stressMax.value) || 0,
      },
      hp: {
        current: Number(hpCur.value) || 0,
        max: Number(hpMax.value) || 0,
      },
      armor: {
        currentUsed: Number(armorUsed.value) || 0,
        max: Number(armorMax.value) || 0,
      },
      damageThreshold: {
        minorthreshold: Number(thMinor.value) || 0,
        majorthreshold: Number(thMajor.value) || 0,
      },
    },
    inventory: {
      ...c.inventory,
      slotsTotal: Number(invSlotsTotal.value) || 0,
      activeLimit: Number(invActiveLimit.value) || 0,
      items: readInventoryFromDom(),
    },
    skills: {
      ...c.skills,
      activeSkills: readSkillRefsFromDom(activeSkillsList),
      vault: readSkillRefsFromDom(skillVaultList),
      // experiences/passiveSkills lassen wir erstmal wie sie sind
      experiences: c.skills.experiences ?? [],
      passiveSkills: c.skills.passiveSkills ?? [],
    },
  };
}

function readInventoryFromDom(): InventoryItem[] {
  const rows = invList.querySelectorAll<HTMLDivElement>(".row[data-id]");
  const items: InventoryItem[] = [];

  rows.forEach((row) => {
    const id = row.dataset.id!;
    const name = (
      row.querySelector<HTMLInputElement>('[data-field="name"]')?.value ?? ""
    ).trim();
    const slotSize =
      Number(
        row.querySelector<HTMLInputElement>('[data-field="slotSize"]')?.value ??
          0,
      ) || 0;
    const active =
      row.querySelector<HTMLInputElement>('[data-field="active"]')?.checked ??
      false;
    const note = (
      row.querySelector<HTMLInputElement>('[data-field="note"]')?.value ?? ""
    ).trim();

    items.push({ id, name, slotSize, active, note });
  });

  return items;
}

function renderSkillRefs(
  container: HTMLDivElement,
  items: Skill[],
  emptyText: string,
) {
  if (items.length === 0) {
    container.innerHTML = `<p class="muted">${emptyText}</p>`;
    return;
  }

  container.innerHTML = `
    <div class="row small" style="grid-template-columns: 1.5fr 2fr 90px;">
      <div>Name</div>
      <div>Notiz</div>
      <div></div>
    </div>
    ${items
      .map(
        (it) => `
      <div class="row" style="grid-template-columns: 1.5fr 2fr 90px;" data-id="${it.skillId}">
        <input data-field="name" type="text" value="${escapeHtml(it.skillName)}" />
        <input data-field="note" type="text" value="${escapeHtml(it.skillBeschreibung)}" />
        <button data-action="delete" type="button">Löschen</button>
      </div>
    `,
      )
      .join("")}
  `;

  container
    .querySelectorAll<HTMLButtonElement>('button[data-action="delete"]')
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = btn.closest<HTMLDivElement>(".row[data-id]");
        row?.remove();
      });
    });
}

function readSkillRefsFromDom(container: HTMLDivElement): Skill[] {
  const rows = container.querySelectorAll<HTMLDivElement>(".row[data-id]");
  const items: Skill[] = [];

  rows.forEach((row) => {
    const id = row.dataset.id!;
    const name = (
      row.querySelector<HTMLInputElement>('[data-field="name"]')?.value ?? ""
    ).trim();
    const note = (
      row.querySelector<HTMLInputElement>('[data-field="note"]')?.value ?? ""
    ).trim();
    items.push({ id, name, note });
  });

  return items;
}
async function loadCharacters() {
  characters = await repo.list();
  renderList();

  // wenn etwas ausgewählt war: neu laden
  if (selectedId) {
    const reloaded = await repo.getById(selectedId as any);
    if (reloaded) {
      fillForm(reloaded);
      setEditorVisible(true);
    } else {
      selectedId = null;
      setEditorVisible(false);
    }
  }
}

async function selectCharacter(id: string) {
  selectedId = id;
  const c = await repo.getById(id as any);
  if (!c) {
    setEditorVisible(false);
    await loadCharacters();
    return;
  }
  fillForm(c);
  setEditorVisible(true);
  renderList();
}

fClass.addEventListener("change", () => {
  const selectedClass = fClass.value as ClassName;
  refreshSubclassOptions(selectedClass);
});

btnNew.addEventListener("click", async () => {
  const c = createNewCharacter();
  await repo.save(c);
  selectedId = c.id;
  await loadCharacters();
  await selectCharacter(c.id);
});

editorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!selectedId) return;

  const current = await repo.getById(selectedId as any);
  if (!current) return;

  const updated = readFormInto(current);
  await repo.save(updated);

  await loadCharacters();
  await selectCharacter(updated.id);
});

btnDelete.addEventListener("click", async () => {
  if (!selectedId) return;
  await repo.delete(selectedId as any);
  selectedId = null;
  setEditorVisible(false);
  await loadCharacters();
});

btnAddItem.addEventListener("click", () => {
  // Wir hängen eine neue Row direkt ans DOM
  const id = crypto.randomUUID();

  // Wenn invList aktuell "Noch keine Items" zeigt, neu rendern:
  const current = readInventoryFromDom();
  const next: InventoryItem[] = [
    ...current,
    { id, name: "", slotSize: 1, active: false, note: "" },
  ];

  renderInventory(next);
});

btnAddActiveSkill.addEventListener("click", () => {
  const id = crypto.randomUUID();
  const current = readSkillRefsFromDom(activeSkillsList);
  const next: SkillRef[] = [...current, { id, name: "", note: "" }];
  renderSkillRefs(activeSkillsList, next, "Noch keine aktiven Fähigkeiten.");
});

btnAddSkillVault.addEventListener("click", () => {
  const id = crypto.randomUUID();
  const current = readSkillRefsFromDom(skillVaultList);
  const next: SkillRef[] = [...current, { id, name: "", note: "" }];
  renderSkillRefs(skillVaultList, next, "Noch keine Vault-Fähigkeiten.");
});

// Start
setEditorVisible(false);
loadCharacters();
