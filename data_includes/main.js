PennController.ResetPrefix(null);
PennController.DebugOff()
PennController.SetCounter("Counter")
PennController.Sequence("L1Check", "DeviceCheck", "Counter", "Welcome", "Consent", "trials", "QuestionnairePage", "DebriefingPage", "Send", "Closing")
AddHost("https://users.ugent.be/~mslim/Priming_img/");

// Check for L1
PennController("L1Check",
    newText("Twee korte vragen vooraf:")
        .print()
    ,
    newText("nativeDutch", "<br><br>Allereerst, is Nederlands je moedertaal?<br><br>")
        .print()
    ,
    newButton("yesDutch", "Ja")
    ,
    newButton("noDutch", "Nee")
        .settings.before( getButton("yesDutch") )
        .print()
    ,
    newSelector("yesnoDutch")
        .settings.add( getButton("yesDutch") , getButton("noDutch"))
        .wait()
    ,
    getSelector("yesnoDutch")
        .settings.log()
        .test.selected(getButton("yesDutch") )
        .failure(
            newText("<br><br>Helaas kom je niet in aanmerking voor dit experiment. Gelieve het experiment af te breken door de browser af te sluiten<br><br>")
                .print()
            ,
            newKey("SPACE")
            .wait()
        )
    ,
    newText("Device", "<br><br>En ten tweede, ben je dit experiment nu aan het doen op een laptop of computer (dus geen gsm, iPad, etc.)?<br><br>")
        .print()
    ,
    newButton("yesPC", "Ja")
    ,
    newButton("noPC", "Nee")
        .settings.before( getButton("yesPC") )
        .print()
    ,
    newSelector("yesnoPC")
        .settings.add( getButton("yesPC") , getButton("noPC"))
        .wait()
    ,
    getSelector("yesnoPC")
        .settings.log()
        .test.selected(getButton("yesPC") )
        .failure(
            newText("<br><br>Helaas werkt dit experiment alleen goed op een browser op een computer/laptop, daarom vraag ik je om het experiment opnieuw op te starten in een browser op een computer/laptop. <br><br>")
                .print()
            ,
            newKey("SPACE")
            .wait()
        )         
)
// Welcome, consent, and creditstuff
// Instructions
    PennController("Welcome",
        newText("WelcomeText", "<p>Welkom en bedankt dat je deelneemt aan dit experiment!</p><p> </p><p>In dit experiment zul je Nederlandse zinnen zien met onderstaand twee afbeeldingen. Het is de taak om de afbeelding te kiezen die het beste bij de zin past. Indien je beide afbeeldingen vindt passen, kies dan je spontane voorkeur. De zinnen en/of afbeeldingen geven overigens niet per se realistische situaties aan. Nadat je deze taak hebt voltooid, volgt er een korte vragenlijst met vragen over je taalachtergrond. De volledige survey neemt ongeveer 30 tot 40 minuten in beslag. Zorg er dus voor dat je ongeveer een uur rustig kunt werken zonder afleidingen.</p><p> </p><p>De resultaten worden volledig anoniem opgeslagen en verwerkt. De resultaten kunnen worden gepubliceerd in wetenschappelijke tijdschriften of gepresenteerd op wetenschappelijke conferenties. Wederom zal de data dan volledig anoniem worden besproken. Daarnaast is het belangrijk dat deelname aan dit experiment vrijwillig is. Aan het einde van dit experiment zal ik je uitleggen wat het doel van dit experiment en mijn onderzoek is.</p><p> </p><p>Indien je vragen heeft of verdere informatie wilt, kun je contact met mij opnemen door te mailen naar mieke.slim@ugent.be</p><p> </p><p><b>Soms komt er een laadscherm in het beeld. Wacht dan even enkele seconden, dit duurt doorgaans nooit lang.</b></p><p> </p><p>Geef hieronder je <b>Prolific ID</b> in te voeren, zodat we je betaling kunnen verwerken via Prolific.")
        ,
        newCanvas( "myCanvas", 500, 600)
            .settings.add(0,0, getText("WelcomeText"))
            .print()
        ,
        newTextInput("ID")
            .print()
        ,
        newButton("finish", "Ga door")
            .print()
            .wait()  
        ,
        newVar("Subject")
            .settings.global()
            .set( getTextInput("ID"))
     )
    
// Consent
    PennController("Consent",
        newText("ConsentText", "<p> <b> Lees onderstaande informatie nauwkeurig door! </b> </p><p>Ik, verklaar hierbij dat ik, als proefpersoon bij een experiment aan de Vakgroep Experimentele Psychologie van de Universiteit Gent,</p><p>(1) de uitleg over de aard van de vragen, taken, opdrachten en stimuli die tijdens dit onderzoek zullen worden aangeboden heb gelezen en dat me de mogelijkheid werd geboden om bijkomende informatie te verkrijgen.</p><p>(2) totaal uit vrije wil deelneem aan het wetenschappelijk onderzoek.</p><p>(3) de toestemming geef aan de proefleider om mijn resultaten op anonieme wijze te bewaren, te verwerken en te rapporteren.</p><p>(4) op de hoogte ben van de mogelijkheid om mijn deelname aan het onderzoek op ieder moment stop te zetten. Indien ik deelneem in het raam van mijn opleiding heeft het stopzetten van mijn deelname geen negatieve invloed op mijn punten (er worden geen punten afgetrokken, maar ook niet verdiend).</p><p>(5) ervan op de hoogte ben dat ik op aanvraag een samenvatting van de onderzoeksbevindingen kan krijgen.</p>")
        ,
        newCanvas( "myCanvas", 500, 600)
            .settings.add(0,0, getText("ConsentText"))
            .print()
        ,
        newButton("Ik heb bovenstaande gelezen en ga akkoord")
            .settings.center()
            .print()
            .wait()    
        )



// Implementing the Trials
    PennController.Template("trials.csv",
        variable => PennController("trials", 
            newText("sentence", variable.Sentence)
                .settings.center()
                .settings.css("font-size", "30px")
                .settings.bold()
                .print()
            ,
            newImage("picture1", variable.Picture1)
                .settings.size(350,350)
                .settings.css( "border" , "solid 1px black" )
            ,
            newImage("picture2", variable.Picture2)
                .settings.size(350,350)
                .settings.css( "border" , "solid 1px black" )                                   
            ,
            newCanvas(1000,600)
                .settings.center()
                .settings.add(50   , 100,   getImage("picture1"))
                .settings.add(550   , 100,   getImage("picture2"))
                .print()
            ,
            newSelector()
                .settings.add( getImage("picture1") , getImage("picture2") )
                .shuffle()
                .settings.log()
                .wait()
        )
    .log( "Subject"         , getVar("Subject")         )     
    .log( "Group"           , variable.Group            )
    .log( "StimulusType"    , variable.Stimuli_Type     )                            
    .log( "Sentence"        , variable.Sentence         )
    .log( "Item"            , variable.Item             )
    .log( "Picture1"        , variable.Picture1         )                           
    .log( "Experiment"      , variable.Experiment       ) 
    .log( "Picture2"        , variable.Picture2         )
    .log( "PrimeCondition"  , variable.PrimeCondition   )                           
    .log( "PrimeQuantifier" , variable.PrimeQuantifier  )                   
)


// Vragen gegevens:
PennController("QuestionnairePage",
    newHtml("Questionnaire", "Questionnaire.html")
        .settings.log()
        .print()
    ,
    newButton("continue", "Volgende")
        .print()
        .wait(
            getHtml("Questionnaire").test.complete()
                .failure( getHtml("Questionnaire").warn() )
        )                      
)
.log( "Subject", getVar("Subject")) 

//Debriefing
PennController("DebriefingPage",
    newHtml("Debriefing", "Debriefing.html")
        .settings.log()
        .print()
    ,
    newButton("continue", "Volgende")
        .print()
        .wait(
            getHtml("Debriefing").test.complete()
                .failure( getHtml("Debriefing").warn() )
                )  
)
.log( "Subject", getVar("Subject")) 


PennController.SendResults("Send");

PennController("Closing",
        newText("Explanation", "</p>Beste deelnemer, <br><br> Allereerst, dank je wel voor je deelname! Ik zal je nu uitleggen wat het doel is van dit experiment is.<br><br> In dit experiment heb je zinnen gelezen en daarbij één uit twee afbeeldingen gekozen. Sommige van deze zinnen hadden de vorm <i>Iedere/Elke/Alle...een...'</i>, zoals de zin <i>Iedere/Elke/Alle wandelaars beklimmen een heuvel</i>.  Deze zinnen kunnen op twee manieren geïnterpreteerd worden: alle wandelaars kunnen dezelfde heuvel beklimmen, maar het kan ook zijn dat elke wandelaar een andere heuvel beklimt.<br><br>Zoals je wellicht heeft gemerkt, werd je bij sommige trials geforceerd om één bepaalde interpretatie te kiezen, omdat het andere plaatje niet paste. Op de daaropvolgende trial kon je kiezen tussen twee plaatjes die de twee mogelijke interpretaties weergaven. Waarom was dat? Het doel van dit experiment is om te bestuderen of de interpretatie van ambigue zinnen zoals <i>Iedere/Elke/Alle wandelaars beklimmen een heuvel</i> wordt beïnvloed door eerdere interpretaties van soortgelijke zinnen. Als dat het geval is, lijkt het namelijk zo te zijn dat je representatie van de interpretatie nog even actief blijft en latere taalverwerking beïnvloedt (ook wel bekend als <i> priming </i>. Dit geeft ons inzicht in de psychologische processing van taalverwerking op het niveau van taal<i>betekenis</i> <br><br>Indien je wilt, kunt u ook een overzicht krijgen van alle resultaten zodra het onderzoek is afgelopen. Stuur in dat geval een mail naar mieke.slim@ugent.be. Je kunt mij natuurlijk ook een mail sturen als je andere vragen heeft of meer informatie zou willen. <br><br>Nogmaals bedankt voor uw deelname!<br><br>Met vriendelijke groeten,<br>Mieke Slim</p>")
        ,
        newText("Link", "<p><a href='https://formulaire.unige.ch/outils/limesurveyfac/traduction-interpretation/index.php/282856?lang=en'><b> KLIK HIER OM NAAR HET LAATSTE DEEL VAN DIT EXPERIMENT GELEID TE WORDEN</a></p>")
        ,
        newCanvas("Canvas", 500, 600)
            .settings.add(0,50, getText("Explanation"))
            .settings.add(0,0, getText("Link"))       
            .print()
        ,
        newButton("void")
            .wait()
     )


