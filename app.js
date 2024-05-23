document.getElementById('editBtn').addEventListener('click', toggleEditMode);
document.getElementById('saveBtn').addEventListener('click', saveCharacter);
document.getElementById('loadBtn').addEventListener('click', openCharacterModal);
document.getElementById('addAbilityBtn').addEventListener('click', openAbilityModal);
document.getElementById('confirmAddAbility').addEventListener('click', addAbility);
document.querySelectorAll('.close').forEach(el => el.addEventListener('click', closeModal));
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});

let editMode = false;
let abilities = [];

function toggleEditMode() {
    editMode = !editMode;
    const fields = document.querySelectorAll('input[type="text"], input[type="number"], textarea, input[type="checkbox"]');
    fields.forEach(field => {
        if (field.id !== 'current_hp') {
            field.disabled = !editMode;
        }
    });

    document.getElementById('editBtn').textContent = editMode ? 'Lock' : 'Edit';
}

function saveCharacter() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;
    const level = document.getElementById('level').value;
    const max_hp = document.getElementById('max_hp').value;
    const current_hp = document.getElementById('current_hp').value;
    const ac = document.getElementById('ac').value;
    const hit_dice = document.getElementById('hit_dice').value;
    const stats = {
        str: document.getElementById('str').value,
        dex: document.getElementById('dex').value,
        con: document.getElementById('con').value,
        int: document.getElementById('int').value,
        wis: document.getElementById('wis').value,
        cha: document.getElementById('cha').value
    };
    const saves = {
        str_save: document.getElementById('str_save').checked,
        dex_save: document.getElementById('dex_save').checked,
        con_save: document.getElementById('con_save').checked,
        int_save: document.getElementById('int_save').checked,
        wis_save: document.getElementById('wis_save').checked,
        cha_save: document.getElementById('cha_save').checked
    };
    const skills = {
        acrobatics: document.getElementById('acrobatics').checked,
        animal_handling: document.getElementById('animal_handling').checked,
        arcana: document.getElementById('arcana').checked,
        athletics: document.getElementById('athletics').checked,
        deception: document.getElementById('deception').checked,
        history: document.getElementById('history').checked,
        insight: document.getElementById('insight').checked,
        intimidation: document.getElementById('intimidation').checked,
        investigation: document.getElementById('investigation').checked,
        medicine: document.getElementById('medicine').checked,
        nature: document.getElementById('nature').checked,
        perception: document.getElementById('perception').checked,
        performance: document.getElementById('performance').checked,
        persuasion: document.getElementById('persuasion').checked,
        religion: document.getElementById('religion').checked,
        sleight_of_hand: document.getElementById('sleight_of_hand').checked,
        stealth: document.getElementById('stealth').checked,
        survival: document.getElementById('survival').checked
    };
    const abilities = JSON.stringify(getAbilitiesFromDOM());
    const inventory = document.getElementById('inventory').value;
    const spells = document.getElementById('spells').value;

    const character = {
        name,
        className,
        level,
        max_hp,
        current_hp,
        ac,
        hit_dice,
        stats,
        saves,
        skills,
        abilities,
        inventory,
        spells
    };

    localStorage.setItem('character_' + name, JSON.stringify(character));
    alert('Character saved!');
}

function openCharacterModal() {
    const characterModal = document.getElementById('characterModal');
    characterModal.style.display = 'block';
    renderCharacterList();
}

function renderCharacterList() {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('character_')) {
            const characterName = key.replace('character_', '');
            const listItem = document.createElement('li');

            const loadButton = document.createElement('button');
            loadButton.className = 'character-button';
            loadButton.textContent = characterName;
            loadButton.addEventListener('click', () => loadCharacter(characterName));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteCharacter(characterName));

            listItem.appendChild(loadButton);
            listItem.appendChild(deleteButton);
            characterList.appendChild(listItem);
        }
    });
}

function deleteCharacter(characterName) {
    if (confirm(`Are you sure you want to delete ${characterName}?`)) {
        localStorage.removeItem('character_' + characterName);
        renderCharacterList();
    }
}

function loadCharacter(characterName) {
    const character = JSON.parse(localStorage.getItem('character_' + characterName));

    if (character) {
        document.getElementById('name').value = character.name;
        document.getElementById('class').value = character.className;
        document.getElementById('level').value = character.level;
        document.getElementById('max_hp').value = character.max_hp;
        document.getElementById('current_hp').value = character.current_hp;
        document.getElementById('ac').value = character.ac;
        document.getElementById('hit_dice').value = character.hit_dice;
        document.getElementById('str').value = character.stats.str;
        document.getElementById('dex').value = character.stats.dex;
        document.getElementById('con').value = character.stats.con;
        document.getElementById('int').value = character.stats.int;
        document.getElementById('wis').value = character.stats.wis;
        document.getElementById('cha').value = character.stats.cha;
        document.getElementById('str_save').checked = character.saves.str_save;
        document.getElementById('dex_save').checked = character.saves.dex_save;
        document.getElementById('con_save').checked = character.saves.con_save;
        document.getElementById('int_save').checked = character.saves.int_save;
        document.getElementById('wis_save').checked = character.saves.wis_save;
        document.getElementById('cha_save').checked = character.saves.cha_save;
        document.getElementById('acrobatics').checked = character.skills.acrobatics;
        document.getElementById('animal_handling').checked = character.skills.animal_handling;
        document.getElementById('arcana').checked = character.skills.arcana;
        document.getElementById('athletics').checked = character.skills.athletics;
        document.getElementById('deception').checked = character.skills.deception;
        document.getElementById('history').checked = character.skills.history;
        document.getElementById('insight').checked = character.skills.insight;
        document.getElementById('intimidation').checked = character.skills.intimidation;
        document.getElementById('investigation').checked = character.skills.investigation;
        document.getElementById('medicine').checked = character.skills.medicine;
        document.getElementById('nature').checked = character.skills.nature;
        document.getElementById('perception').checked = character.skills.perception;
        document.getElementById('performance').checked = character.skills.performance;
        document.getElementById('persuasion').checked = character.skills.persuasion;
        document.getElementById('religion').checked = character.skills.religion;
        document.getElementById('sleight_of_hand').checked = character.skills.sleight_of_hand;
        document.getElementById('stealth').checked = character.skills.stealth;
        document.getElementById('survival').checked = character.skills.survival;
        loadAbilitiesFromString(character.abilities);
        toggleEditMode(); // Apply initial state of fields
        closeModal();
        alert('Character loaded!');
    } else {
        alert('No character found!');
    }
}

function openAbilityModal() {
    document.getElementById('abilityModal').style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

function addAbility() {
    const title = document.getElementById('abilityTitle').value;
    const description = document.getElementById('abilityDescription').value;

    if (title && description) {
        const ability = { title, description };
        abilities.push(ability);
        renderAbilities();
        closeModal();
    } else {
        alert('Please enter both title and description.');
    }
}

function renderAbilities() {
    const abilitiesList = document.getElementById('abilitiesList');
    abilitiesList.innerHTML = '';
    abilities.forEach((ability, index) => {
        const abilityButton = document.createElement('button');
        abilityButton.className = 'ability-button';
        abilityButton.textContent = ability.title;
        abilityButton.onclick = () => viewAbility(index);
        abilitiesList.appendChild(abilityButton);
    });
}

function viewAbility(index) {
    const ability = abilities[index];
    const description = prompt(`Description of ${ability.title}:`, ability.description);
    if (description === null) return;
    if (description === '') {
        if (confirm('Do you want to delete this ability?')) {
            abilities.splice(index, 1);
            renderAbilities();
        }
    } else {
        ability.description = description;
        renderAbilities();
    }
}

function loadAbilitiesFromString(abilitiesString) {
    abilities = JSON.parse(abilitiesString);
    renderAbilities();
}

function getAbilitiesFromDOM() {
    return abilities;
}
