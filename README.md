### Skýrsla fyrir Lokaverkefni

  Halldóra, Svava og Þórunn ákváðu að vera saman í hóp að vinna þetta
verkefni. Það var mikið pælt og lengi hugsað hvernig síðu ætti að gera. Að lokum
var ákveðið að gera síðu með spjallþráðum.
  Í grunninn var notast við verkefni 6 þar sem fyrir var nýskráning, innskráning
og hægt að skrifa á veggi. Byrjað var á því að betrumbæta nýskráninguna með því
að bæta við fleiri upplýsingum um notandann og gera betri villu prófanir. Þær
staðfesta að upplýsingar séu rétt upp settar og engir árekstrar séu í
gagnagrunninum miðað við þær takmarkanir sem voru settar á hann. Til dæmis að
þurfti hvert notendanafn og e-mail að vera einstakt og staðfesta þurfti
lykilorð.
  Bætt var við notendasvæðum þar sem notandinn getur skoðað og breytt sínum
upplýsingum. Einnig er hægt að skoða 'mína þræði' þar inná. Seinna kom sú
hugmynd að hægt væri að skoða notendasíðu hjá öðrum notendum, en hægt er nálgast
þá í athugasemdum inní þráðunum, með því að klikka annaðhvort á notendanafnið
eða notendamyndina þeirra. Þar kom upp smá vesen þar sem í fyrra verkefni var
ekki hægt að fara inná notendasvæði nema að notandinn eigi það svæði, annars var
notandinn skráður út. Eftir smá púsl hafðist þetta að lokum.
  Út frá fyrra verkefni voru byggðir þræðir og athugasemdir, þar sem 'veggurinn'
úr fyrra verkefni varð að athugasemdunum í þráðunum, en að tengja þurfti
athugasemdirnar við viðeigandi þráð. Svo datt meðlimum hópsins í hug að sniðugt
væri að flokka þræðina eftir umræðuefni. En þá þurfti að ákveða hver umræðuefnin
ættu að vera og þar með þrengja um hvað síðan ætti að vera, en þangað til hafði
hún bara verið almenn spjallsíða. Þar sem meðlimir eru
allir bíó starfsmenn kom upp sú hugmynd að hafa síðuna um bíómyndir og að umræðu
efnið væri mismundandi gerðir af bíómyndum og leikarar. Því næst voru meðlimir í
vandræðum með hvernig ætti að birta hvern flokk, en hugmyndin var að hafa flipa
til að skoða þræðina í hverjum flokki. Það reyndist smá meira vesen en búist var
við þar sem það venjulega virknin skv Bootstrap er að fliparnir leiði inná
mismundandi slóðir. Í staðinn var notast við framenda javascript sem tengdist
'jade' til að fá mismundandi upplýsingar til að birtast þegar nýr flipi er
valinn án þess að fara inná nýja slóð.
  Þar sem meðlimir hópsins eru ekki í nákvæmlega sama námi innan
tölvunarfræðinnar gekk stundum erfilega að mæla sér mót þar sem allir gætu mætt
á sama tíma, en nýttur var mesti tíminn sem gafst. Einnig var notast við
'Github' sem einfaldaði samvinnuna þó ekki allir væru mættir á sama stað. Oft
kom þó upp vesen með 'Github', gaf upp villur með 'pull' og 'push'. Það fór
stundum leiðinlega mikill tími í að reyna að laga villur sem 'Github' gaf.
  Í gegnum allt verkefnið gaf 'jshint' fleiri tugi villa þegar verkefnið var
keyrt upp með 'gulp'. Allar villurnar voru t.d á 'require' eða 'console', sem
meðlimum fannst einstaklega skítið. Leitað var til dæmatímakennara sem benti á
að þyrfti að nota 'jshintrc' skrá sem skilgreinir reglur og segir 'jshint' hvað
má og hvað ekki.
  Fyrir utan einstakar leiðinlegar villur og tímabil þar sem meðlimir voru stopp
gekk samvinnan mjög vel. Allir meðlimir þekkjast vel og hafa unnið saman áður og
voru óhræddir að tjá sig um hin ýmsu mál.


### Uppsetning

Stilla gagnarunninn í
-

- npm install
- gulp

'schema.sql' inniheldur uppsetninguna á gagnagrunninum
