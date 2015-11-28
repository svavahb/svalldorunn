### Skýrsla fyrir Lokaverkefni

Í hópnum eru nemendurnir Halldóra, Svava og Þórunn. Var ákveðið að gera síðu
með spjallþráðum.
  Í grunninn var notast við verkefni nr. 6 þar sem fyrir var nýskráning,
innskráning og hægt að skrifa á veggi. Byrjað var á því að betrumbæta
nýskráninguna með því að bæta við fleiri upplýsingum um notandann og gera betri
villuprófanir. Þær staðfesta að upplýsingar eru rétt upp settar og engir
árekstrar séu í gagnagrunninum miðað við þær takmarkanir sem á hann voru settar,
t.d. að hvert notendanafn og e-mail þurfti að vera einstakt og staðfesta þurfti
lykilorð.
  Bætt var við notendasvæðum þar sem notandinn getur skoðað og breytt sínum
upplýsingum. Einnig er hægt að skoða „mína þræði“ þar inná. Seinna kom sú
hugmynd að hægt væri að skoða notendasíðu hjá öðrum notendum. Hægt er nálgast
þær í athugasemdum inní þráðunum með því að klikka annaðhvort á notendanafnið
eða notendamyndina þeirra. Þar kom upp vandamál, þar sem að í fyrra verkefni var
ekki hægt að fara inná notendasvæði nema notandinn ætti það svæði, annars var
notandinn skráður út. Eftir smá púsl hafðist þetta að lokum.
  Út frá fyrra verkefni voru byggðir þræðir og athugasemdir, þar sem „veggurinn“
úr fyrra verkefni varð að athugasemdunum í þráðunum en tengja þurfti
athugasemdirnar við viðeigandi þráð. Svo datt meðlimum hópsins í hug að sniðugt
væri að flokka þræðina eftir umræðuefni. Þá þurfti að ákveða hver umræðuefnin
ættu að vera og þar með þrengja um hvað síðan ætti að vera, en hingað til hafði
hún bara verið almenn spjallsíða. Þar sem meðlimir eru
allir starfsmenn í kvikmyndahúsum kom upp sú hugmynd að hafa síðuna um
kvikmyndir og að umræðuefnin væru ólíkar tegundir bíómynda og leikarar. Því næst
voru meðlimir í vandræðum með hvernig ætti að birta hvern flokk, en hugmyndin
var að hafa flipa til að skoða þræðina í hverjum flokki. Það reyndist stærra
vandamál en búist var við þar sem venjulega virknin samkvæmt Bootstrap er að
fliparnir leiði inn á mismundandi slóðir. Í staðinn var notast við framenda
javascript sem tengdist „jade“ til að fá mismundandi upplýsingar til að birtast
þegar nýr flipi er valinn án þess að fara inn á nýja slóð.
  Þar sem meðlimir hópsins eru ekki í nákvæmlega sama námi innan
tölvunarfræðinnar gekk stundum erfiðlega að ákveða tímasetningar til að vinna
verkefnið. Voru þó öll tækifæri til þess nýtt. Einnig var notast við „Github“
sem einfaldaði samvinnuna þrátt fyrir að ekki væru allir mættir. Oft komu þó upp
vandamál með „Github“ sem gaf upp villur með „pull“ og „push“. Það fór stundum
mikill tími í að reyna að laga þessar villur.
  Í gegnum allt verkefnið gaf „jshint“ fleiri tugi villna þegar verkefnið var
keyrt upp með „gulp“. Voru villurnar t.d. á „require“ eða „console“, sem
meðlimum hópsins þótti skrýtið. Leitað var til dæmatímakennara sem benti á
að nota þyrfti „jshintrc“ skrá sem skilgreinir reglur og segir „jshint“ hvað
má og hvað ekki.
  Eina stóra villan sem við vitum af og höfum ekki náð að laga, er að þegar
notandi prófar að skipta um mynd inni á prófílnum, og setur ekki gildan link
heldur eitthvað annað (t.d. "bla"), sækir síðan þann streng í stað þess sem það
á að sækja þegar við köllum á req.params. Við náðum ekki að átta okkur á því
hvers vegna, og allar tilraunir okkar til að validate-a urlið virkuðu ekki.
Við náðum hins vegar að láta það virka með register.js, svo þegar fólk nýskráir
sig getur það bara sett gildan myndalink.
  Fyrir utan einstaka villur og tímabil þar sem vinnan stöðvaðist
gekk verkefnið mjög vel. Allir meðlimir þekkjast vel og hafa unnið saman áður og
voru óhræddir að tjá sig um hin ýmsu mál.



### Uppsetning

Stilla gagnagrunninn í '.env'

- npm install
- gulp

'schema.sql' inniheldur uppsetninguna á gagnagrunninum
