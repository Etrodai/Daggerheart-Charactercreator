import type { ClassName } from "./ClassName"
import type { DomainName } from "./DomainName"

export interface Domain{
    beschreibung: string,
    klassen: ClassName[],
}

export const domains: Record<DomainName, Domain> = {
    Arcana: {
        beschreibung:
            "Arcana ist die Domäne der angeborenen und instinktiven Magie. Diejenigen, die diesen Pfad wählen, greifen auf die rohen, rätselhaften Kräfte der Reiche zu, um sowohl ihre eigene Energie als auch die Elemente zu manipulieren. Arcana bietet eine volatile, aber extrem mächtige Kraft, wenn sie richtig kanalisiert wird.",
        klassen: ["Druid", "Sorcerer"],
    },

    Blade: {
        beschreibung:
            "Blade ist die Domäne der Waffenmeisterschaft. Ob mit Stahl, Bogen oder einer spezielleren Waffe – Anhänger dieses Pfades besitzen die Fähigkeit, das Leben anderer zu beenden. Wielders der Blade-Domäne widmen sich der unerbittlichen Beherrschung des Todes im Kampf.",
        klassen: ["Guardian", "Warrior"],
    },

    Bone: {
        beschreibung:
            "Bone ist die Domäne von Taktik und Körperbeherrschung. Praktizierende besitzen eine außergewöhnliche Kontrolle über ihre eigenen physischen Fähigkeiten und können das Verhalten von Gegnern im Kampf vorhersagen. Anhänger dieser Domäne entwickeln ein tiefes Verständnis von Körpern und Bewegung.",
        klassen: ["Ranger", "Warrior"],
    },

    Codex: {
        beschreibung:
            "Codex ist die Domäne des intensiven magischen Studium . Wer nach magischem Wissen sucht, studiert die Gleichungen der Macht, festgehalten in Büchern, auf Schriftrollen, in Wände eingeritzt oder auf Körper tätowiert. Codex gewährt ein mächtiges und vielseitiges Verständnis von Magie.",
        klassen: ["Bard", "Wizard"],
    },

    Grace: {
        beschreibung:
            "Grace ist die Domäne des Charisma . Durch mitreißende Geschichten, charmante Magie oder ein Netz aus Lügen formen ihre Anhänger die Wahrnehmung ihrer Gegner. Grace verleiht magnetische Ausstrahlung und Meisterschaft über Sprache und Wahrnehmun .",
        klassen: ["Bard", "Rogue"],
    },

    Midnight: {
        beschreibung:
            "Midnight ist die Domäne von Schatten und Geheimnisse . Ob durch Tricks, subtile Magie oder die Deckung der Nacht – ihre Anhänger beherrschen die Kunst der Verborgenheit. Midnight erlaubt es, Rätsel zu erschaffen und verborgene Geheimnisse aufzudecke .",
        klassen: ["Rogue", "Sorcerer"],
    },

    Sage: {
        beschreibung:
            "Sage ist die Domäne der Natu . Anhänger greifen auf die ungebändigte Kraft der Erde und ihrer Kreaturen zurück, um rohe Magie zu entfesseln. Sage verleiht die Vitalität einer blühenden Pflanze und die Wildheit eines Raubtier .",
        klassen: ["Druid", "Ranger"],
    },

    Splendor: {
        beschreibung:
            "Splendor ist die Domäne des Leben . Durch diese Magie können Anhänger heilen und in gewissem Maß auch den Tod beeinflussen. Splendor gewährt die außergewöhnliche Fähigkeit, Leben zu geben oder zu beende .",
        klassen: ["Seraph", "Wizard"],
    },

    Valor: {
        beschreibung:
            "Valor ist die Domäne des Schutze . Ob durch Angriff oder Verteidigung – ihre Anhänger nutzen enorme Stärke, um ihre Verbündeten zu schützen. Valor verleiht große Macht jenen, die ihren Schild zum Schutz anderer erhebe .",
        klassen: ["Guardian", "Seraph"],
    }
}
