document.getElementById('saveBtn').addEventListener('click', saveCharacter);
document.getElementById('loadBtn').addEventListener('click', loadCharacter);

function saveCharacter() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;
    const level = document.getElementById('level').value;
    const hp = document.getElementById('hp').value;
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
    const inventory = document.getElementById('inventory').value;
    const spells = document.getElementById('spells').value;

    const character = {
        name,
        className,
        level,
        hp,
        stats,
        saves,
        skills,
        inventory,
        spells
    };

    localStorage.setItem('character', JSON.stringify(character));
    alert('Character saved!');
}

function loadCharacter() {
    const character = JSON.parse(localStorage.getItem('character'));

    if (character) {
        document.getElementById('name').value = character.name;
        document.getElementById('class').value = character.className;
        document.getElementById('level').value = character.level;
        document.getElementById('hp').value = character.hp;
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
        document.getElementById('inventory').value = character.inventory;
        document.getElementById('spells').value = character.spells;
        alert('Character loaded!');
    } else {
        alert('No character found!');
    }
}
