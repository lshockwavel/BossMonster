let gold = 0;

const heroes = [
{
    name: "Dane",
    type: "warrior",
    attack: 10,
    health: 100,
  },
  {
    name: "Igor",
    type: "mage",
    attack: 5,
    health: 100
  }
]

const jerk = {
    name: "Jerk",
    attack: 5,
    health: 100,
    maxHealth: 100,
    level: 1,
    deathCount: 0,
}

function attackEnemy() {
    // Getting the total damage done to the enemy
    let totalDamage = 0;
    heroes.forEach(hero => {
        totalDamage += hero.attack;
    });

    // Decreasing the enemy's health by the total damage done
    jerk.health -= totalDamage;

    if(jerk.health <= 0) {
        console.log("The enemy has been defeated!");
        jerk.health = 0; // Set health to 0 to avoid negative health
        evenMoreOfAJerk();
    }

    console.log(`The enemy's health is now: ${jerk.health}`);

    drawJerkHealthBar(); // Call the function to draw the health bar
}

//Level up the enemy/boss
function evenMoreOfAJerk() {
    jerk.level += 1; // Increase the level of the enemy

    awardHero(); // Call the function to award the hero

    // Showing the level up message & stats
    console.log(`The enemy has leveled up to level ${jerk.level}!`);
    const jerkElem = document.getElementById("jerk");

    const levelText = jerkElem.querySelector(".level");
    levelText.innerText = jerk.level; // Update the level text

    jerk.deathCount++;

    //Unvaling the the true horror you have unleashed
    const orphanElem = document.getElementById("jerkCount");
    orphanElem.classList.remove("d-none"); // Remove the hidden class to show the element
    const deathText = orphanElem.querySelector(".deathCount");
    deathText.innerText = jerk.deathCount; // Update the death count text

    //Leveling up the jerk
    jerk.attack += Math.floor(Math.random() * 2); // Increase the attack of the enemy between 0 and 1.
    jerk.maxHealth += Math.ceil(Math.random() * 10); // Increase the max health of the enemy between 1 and 10.
    jerk.health = jerk.maxHealth; // Set the health to the max health
    
    drawJerkHealthBar(); // Call the function to draw the health bar
}

function drawJerkHealthBar() {
    const healthBar = document.getElementById("health-bar");
    const healthPercentage = (jerk.health / jerk.maxHealth) * 100; // Assuming max health is 100
    healthBar.style.width = `${healthPercentage}%`;

    // Getting the number value updated
    const healthText = document.getElementById("Jerk-Health");
    healthText.innerText = `${jerk.health} HP`;
    // healthBar.innerText = `${health} HP`;
}

function attackHeroes() {
    heroes.forEach(hero => {
        // Decreasing the hero's health by the enemy's attack

        //Temp variable damage
        // So it will be random between 1-2
        let damage = Math.ceil(jerk.attack * (Math.random() * 2)); // Random damage between 1 and jerk.attack * 2
        console.log(`The enemy attacks ${hero.name} for ${damage} damage!`);
        hero.health -= damage;

        if(hero.health <= 0) {
            console.log(`${hero.name} has been defeated!`);
            hero.health = 0; // Set health to 0 to avoid negative health
        }

        console.log(`${hero.name}'s health is now: ${hero.health}`);
    })

    // Call the function to draw the health bar for each hero
    drawHeroes();
}

function drawHeroes() {
    heroes.forEach(hero => {
        // Getting the number value updated
        const heroElem = document.getElementById(hero.name);

        const healthText = heroElem.querySelector(".health");

        // @ts-ignore
        healthText.innerText = `${hero.health}`;
    })
}

function awardHero() {
    gold += Math.ceil(Math.random() * 100); // Random gold between 1 and 100
    drawGold();
}

function drawGold() {
    const goldText = document.getElementById("gold"); // Assuming you want to show the gold for the first hero
    goldText.innerText = gold; // Update the gold text
}

function buyHealthPotion(name) {
    const hero = heroes.find(hero => hero.name === name); // Find the hero by name

    if(gold >= 10) { // Check if the player has enough gold
        hero.health += 10; // Increase the hero's health by 10
        gold -= 10; // Decrease the gold by 10
        drawGold(); // Call the function to draw the gold
        console.log(`${hero.name} has bought a health potion!`);
    } 
    else {
        console.log("Not enough gold to buy a health potion!");
    }
}

setInterval(attackHeroes, 5000); // Call the attackHeroes function every 5 seconds

/* Supplies
Sam?
Potion*/