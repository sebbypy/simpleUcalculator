const dropdownKeys = {
	soilTypes: [{
            key: "on_ground",
        }, {
            key: "on_unheated_space",
        }
    ],
    wallTypes: [{
            key: "full_wall",
        }, {
            key: "hollow_wall",
        }
    ],
    roofTypes: [{
            key: "flat_roof",
            Rvalue: 0.15
        }, {
            key: "pitched_roof",
            Rvalue: 0.0
        }, {
            key: "attic_floor",
            Rvalue: 0.15
        }
    ],
    constructElements: [{
            key: "concrete_block_19cm",
            Rvalue: 0.9
        }, {
            key: "fast_build_14cm",
            Rvalue: 0.27
        }, {
            key: "natural_stone_30cm",
            Rvalue: 0.12
        }, {
            key: "cellular_concrete_24cm",
            Rvalue: 0.2
        }, {
            key: "solid_brick_50cm",
            Rvalue: 0.31
        }
    ],
    isolation: [{
            key: "no"
        }, {
            key: "yes"
        }
    ],
    isolationTypes: [{
            key: "mineral_wool",
            lambda_TRD: 0.045,
            lambda_EPBD: 0.032
        }, {
            key: "perlite",
            lambda_TRD: 0.06,
            lambda_EPBD: 0.037
        }, {
            key: "phenolic_foam",
            lambda_TRD: 0.02,
            lambda_EPBD: 0.021
        }, {
            key: "cellulose",
            lambda_TRD: 0.04,
            lambda_EPBD: 0.045
        }
    ],
    wallStructure: [
	{
            key: "none",
            woodFraction: 0
        },
		{
            key: "between_rafters",
            woodFraction: 0.15
        }
    ],
    roofStructure: [
		{
            key: "none",
            woodFraction: 0
        },
		{
            key: "between_rafters",
            woodFraction: 0.15
        }, {
            key: "between_rafters_and_purlins",
            woodFraction: 0.12
        }
    ],
    finishing: [
	{
            key: "none",
            Rvalue: 0
        },{
            key: "cladding",
            Rvalue: 0.2
        }, {
            key: "plaster",
            Rvalue: 0.1
        }, {
            key: "brick_finish",
            Rvalue: 0.3
        }
    ]
};
const translations = {
	title_app:{
		FR:"Calculateur de valeur U",
		NL:"U-waarde rekentool"
	},
	on_ground:{
		FR: "Terre plein",
		NL: "Volle grond"
	},
	on_unheated_space:{
		FR: "Sur espace non chauffé",
		NL: "Boven onverwarmde ruimte"
	},
    full_wall: {
        FR: "Plein",
        NL: "Volle"
    },
    hollow_wall: {
        FR: "Creux",
        NL: "Spouwmuur"
    },
    flat_roof: {
        FR: "Toit plat",
        NL: "Plat dak"
    },
    pitched_roof: {
        FR: "Toit en pente",
        NL: "Hellend dak"
    },
    attic_floor: {
        FR: "Plancher de grenier",
        NL: "Zoldervloer"
    },
    concrete_block_19cm: {
        FR: "Bloc de béton 19 cm",
        NL: "Betonblok 19 cm"
    },
    fast_build_14cm: {
        FR: "Construction rapide 14 cm",
        NL: "Snelbouw 14 cm"
    },
    natural_stone_30cm: {
        FR: "Pierre naturelle 30 cm",
        NL: "Natuursteen 30 cm"
    },
    cellular_concrete_24cm: {
        FR: "Béton cellulaire 24 cm",
        NL: "Cellenbeton 24 cm"
    },
    solid_brick_50cm: {
        FR: "Brique pleine 50 cm",
        NL: "Volle baksteen 50 cm"
    },
    yes: {
        FR: "Oui",
        NL: "Ja"
    },
    no: {
        FR: "Non",
        NL: "Nee"
    },
    mineral_wool: {
        FR: "Laine minérale (MW)",
        NL: "Mineraal wol (MW)"
    },
    perlite: {
        FR: "Perlite (EPB)",
        NL: "Perliet (EPB)"
    },
    phenolic_foam: {
        FR: "Mousse phénolique (PF)",
        NL: "Fenolschuim (PF)"
    },
    cellulose: {
        FR: "Cellulose",
        NL: "Cellulose"
    },
    between_rafters: {
        FR: "Isolation entre chevrons (5-6 cm)",
        NL: "Isolatie tussen kepers (5-6 cm)"
    },
    between_rafters_and_purlins: {
        FR: "Isolation entre chevrons et pannes",
        NL: "Isolatie tussen kepers en gordingen"
    },
    cladding: {
        FR: "Revêtement (bois, le)",
        NL: "Bekleding (hout, le)"
    },
    none: {
        FR: "Aucun",
        NL: "Geen"
    },
    plaster: {
        FR: "Plâtre / mortier",
        NL: "Pleister / mortel"
    },
    brick_finish: {
        FR: "Parement en brique",
        NL: "Gevelsteen / param"
    },
    title: {
        FR: "Feuille de calcul",
        NL: "Berekeningsblad"
    },
    walls: {
        FR: "Murs",
        NL: "Muren"
    },
    roofs: {
        FR: "Toits",
        NL: "Daken"
    },
	soils: {
		FR: "Sols/planchers",
		NL: "Vloeren"
	},
    addRow: {
        FR: "+",
        NL: "+"
    },
    deleteRow: {
        FR: "Supprimer",
        NL: "Verwijderen"
    },
    name: {
        FR: "Nom",
        NL: "Naam"
    },
    type: {
        FR: "Type",
        NL: "Type"
    },
    constructElement: {
        FR: "Élément constructif",
        NL: "Constructief element"
    },
    insulation: {
        FR: "Isolation",
        NL: "Isolatie"
    },
    insulationType: {
        FR: "Type d'isolant",
        NL: "Type isolatie"
    },
    defaultLambda: {
        FR: "λ par défaut",
        NL: "λ waarde"
    },
    userLambda: {
        FR: "λ utilisateur",
        NL: "Gebruiker λ"
    },
    thickness: {
        FR: "Épaisseur [cm]",
        NL: "Dikte [cm]"
    },
    structure: {
        FR: "Structure d'isolation",
        NL: "Hout of metaal structuur"
    },
    finishing: {
        FR: "Finition extérieure",
        NL: "Buitenafwerking"
    },
    uValue: {
        FR: "U [W/m²K]",
        NL: "U [W/m²K]"
    },
    action: {
        FR: "Action",
        NL: "Action"
    },
    note1: {
        FR: "Valeurs λ",
        NL: "Default λ waarden"
    },
    note2: {
        FR: "Cet outil utilise deux types de valeurs λ par défaut: les valeurs typiques pour des isolants neufs sont représentatives des produits présents sur le marché. Les valeurs pour l'isolation existante sont des valeurs pénalisantes similaires à celles utilisées dans les réglementations PEB. L'utilisateur peut toujours introduire une autre valeur si elle est connue.",
        NL: "λ-waarden kunnen rechtstreeks door de gebruiker worden ingevoerd ('Gebruikerslambda-waarde') of standaard worden geselecteerd. De waarde van de gebruiker wordt altijd gebruikt als deze is ingevoerd."
    },
    note3: {
        FR: "Type de valeurs λ par défaut",
        NL: "Type default λ- waarden"
    },
    lambda_new_insulation: {
        FR: "Isolants neufs ou récents",
        NL: "Nieuwe isolatie"
    },
	lambda_old_insulation: {
        FR: "Isolation existantes (valeurs par défaut conservatives)",
        NL: "Bestaande isolatie (conservatieve waarden)"
    },
	intro: {
		FR: "Cet outil permet d'estimer rapidement la valeur U de parois en vue de réaliser un calcul de déperditions thermiques. Il ne s'agit pas d'un calcul détaillé au sens de la norme XXX, mais d'un calcul légèrement simplifié pour obtenir rapidement des valeurs avec une précision acceptable",
		NL: "Die tool kan snel U waarde van verschillende wanden schatten om een warmteverliesberekening te maken. Die berekening is niet conform aan norm XXXX, maar geeft snel U waarden met een aanvaardbare nauwkeurigheid"
	},
	export_csv: {
        FR: "Exporter en CSV",
        NL: "Export naar CSV"
    },
	copy_to_clipboard: {
        FR: "Copier dans le presse-papier",
        NL: "Kopieren naar clipboard"
    },
	soilscomment:{
		FR: "Les valeurs U calculées pour les sols font référence à la température du sol ou de l'espace voisin, et pas à la température extérieure",
		NL: "Vloeren U-warden verwijzen naar de directe omgeving (grond or onvewarmde ruimte), maar niet naar de buitenluchttemperatuur"
	}
	
};
