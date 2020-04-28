
## Overview
Inspirația nu știu de unde mi-a venit, dar am hotărît să fac un program pentru simulație a algoritmului de planificator al unui procesor. Îmi pare că Vue.js este o alegere bună pentru așa proiect dinamic și mi-a plăcut.

Proiectul dat mi-a luat 3-4 zile + polishing.

Pentru slider am folosit [Vue-Slider](https://www.npmjs.com/package/vue-slider-component).

Imagini am luat de pe aici:
1. Cog — https://www.flaticon.com/free-icon/settings_2099058
2. Play-Button — https://www.flaticon.com/free-icon/play_2404635
3. Pause-Button — https://www.flaticon.com/free-icon/pause_2404640

Favicon-ul am desenat singur în 2 minute pentru [un alt proiect al meu](https://antonc9018.github.io/Dungeon-Hopper-Docs/) asupra căruia lucrez curent. Este o joacă open-source și documentarea pentru ea.

## Stuctura
Proiectul este constituit din 3 pagini:

1. `Home`. Este pagina de start care explică ce este asta în general;
2. `Simulation`. Pagina unde are loc lucrurile interesante, de fapt esența proiectului.
3. `Explanations`. Pagina dată cu explicațiile.

Fiecare pagina are un component aparte și ele sunt legate între sine cu un [router](https://router.vuejs.org/).

Există un component pentru nav. Alte componente sunt toate pentru simulația procesorului.

## Algoritmul

În file-ul `algo.js` generez toata informația asociată cu:
1. Procesul activ în orice moment de timp
2. Listele de procese în orice moment de timp (adică waiting, coming și finished)
3. Timestamp-urile ce indică când a avut loc un switch de proces

Adică primim o listă cu toata informația aceasta pentru fiecare moment de timp, când a avut loc o schimbare.

Apoi pur și simplu facem interpolare între aceste stări, selectând indecele potrivit băzându-se pe timp.

Variabila de timp este direct legată cu sliderul, deci poate fi schimbată ușor de către user.

De fapt, `algo.js` definește class-ul `Processor`, care poate fi `extended`. El are niște metode customizabile de către subclass-uri. Am definit niște algoritme de planificare: Round-Robin, SJF, SRTF și FIFS (default behaviour al class-ului `Processor`).

> Gândurile la înbunătățire. La moment, stările procesurilor nu sunt interpolate ideal. Problema de fapt este în ceea că nu se poate schimba timpul cu cantitățile neîntrege. Încă un lucru, nu știu cum să leg informația despre un proces anume cu un element html, ca să continuu animații chiar dacă el își schimbă poziția între liste (active -> finished). Sper că starea curentă este de ajuns bună.

## Comparația de framework-uri

Documentarea oficială a lui Vue.js are [un articol la această temă](https://vuejs.org/v2/guide/comparison.html)

Sumarizez.

React este cel mai dezvoltat la moment web framework. 
1. Și React, și Vue sunt open-source;
2. Au aproape aceeași performanță;
3. Ecosistemul lui React este mai dezvoltată decât al lui Vue;
4. React este mai greu decât Vue pentru dezvoltatorii noi;
5. Există React Native, pe când soluții pentru mobile băzate pe Vue sunt limitate și puțin dezvoltate.

Nu am încercat React, dar am încercat Angular (Angular 2). După experiența mea, Angular este cu mult mai anevoios. Articolul zice că performanța este aceeași, dar bundle-size este de 2 ori mai mare.

Alte framework-uri sunt mai puțin semnificative în comparație cu Vue.

Încă am scris puțin cod cu Elm. Mi-a plăcut în general, în special faptul că este un limbaj de programare funcțional, dar sunt 2 lucruri acolo care eu nu am putut să le suportez:
1. Parsing de JSON este manual și e prea verboz.
2. Există funcția de acces la un field (Accessor), dar nu există funcția de setare a unui field (Setter/Updater). Nu văd în ce mod acesta violează politica lui Elm, dar dezvoltatorii nu vor adăuga aceasta (am citit o discuție la asta, nu o mai pot găsi acum). Această funcție ar elimina 90% de template cod repetetiv în unele proiecte. Serios, la mine un file a conținut același 10 linii de cod, dar pur și simplu cu alte numele ale variabelor. Mai multă informație despre accessor-ul [aici](https://elm-lang.org/docs/records). Primul meu elm proiect [aici](https://github.com/AntonC9018/Elm-schedule)
