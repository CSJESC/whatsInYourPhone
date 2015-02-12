"use strict";

var React = require('react');

var Navigation = require('./general/navigation.jsx');
var Link       = require('./general/link.jsx');

var Methodology = React.createClass({

  render: function () {
    return(
      <div className = "methodology-wrapper">
        <div className = "methodology">
          <a className = "close" href = "./">&#10005;</a>
          <h1>SCORING SYSTEM</h1>
          <p>
            <img src = "./img/meth01.png" alt = "Each cart represents an individual material. Every material in the database is given a score from 0 to 100 points and, based on its score, is  assigned a color accordingly." />
          </p>
          <h1>METHODOLOGY</h1>
          <p>
            <img src = "./img/meth02.png" alt = "Methodology chart" />
          </p>

          <p>
            This project visualizes data about the physical materials which compose our everyday digital devices.  As research indicated minimal differences between materials in electronics, we have decided to focus data collection on generic smartphones. 
          </p>
          <p>
            At the focus of our data visualization is a scoring system which rates materials used in smartphones. Our data is based on extensive research of existing rankings and analyses of materials and the countries in which they are mined.
          </p>
          <p>
            Each material used in a smartphone is assigned and rated according to two categories: HEALTH and RECYCLING RATE. This makes up 40% of the final score.
          </p>
          <p>
            Additionally, materials are also rated according to the countries in which they are mined and the following categories:  HUMAN RIGHTS, WORKING RIGHTS and POLITICAL RISK IN MINING INDUSTRY. Every material is assigned a list of at least 3 countries which produce the top 50% of the total production amount of this material. The country-based score makes up 60% of the final score.
          </p>

          <h1>SCORING CATEGORIES</h1>
          <p>
            The score of each material is given based on 5 categories.
            The following section explains what each category means, which factors it takes into consideration, and what the points in each category represent.
          </p>

          <h2>Categories related to materials</h2>

          <h3>HEALTH</h3>
          <p>
            The health ranking of materials is based on the NFPA-704 standard maintained by the U.S.-based National Fire Protection Association. This standard defines a „fire diamond“, which can be used to quickly identify the risk posed by hazardous materials. The health division of the diamond indicates the health hazard of the material.
          </p> 

          <ol>
            <li>Poses no health hazards, no precautions necessary</li>
            <li>Exposure would cause irritation with only minor residual injury</li>
            <li>Intense or continued but not chronic exposure could cause temporary incapacitation
          or possible residual injury</li>
            <li>Short exposure could cause serious temporary or moderate residual injury</li>
            <li>Very short exposure could cause death or major residual injury</li>
          </ol>

          <h4>Why do we include this in our score?</h4>
          <p>
           This ranking gives an indication of what health risks people face when they come into contact with materials in mines or factories.
          </p>
          <h4>Source</h4>
          <p>
            <Link href = "=>">http://en.wikipedia.org/wiki/National_Fire_Protection_Association</Link>
          </p>

          <h3>RECYCLING RATE</h3>
          <p>
            The functional end-of-life (EOL) recycling rate is an important factor to measure the efficiency of an overall recycling system. Usually metals like aluminium and copper with a very long tradition of use have reuse rates above 50%.  However, EOL recycling rates for many metals are low, despite having excellent properties for recycling.
          </p>

          <ol>
            <li>EOL recycling rate above 50%</li>
            <li>EOL recycling rate between 25 – 30%</li>
            <li>EOL recycling rate between 10 – 25%</li>
            <li>EOL recycling rate between 1 – 10%</li>
            <li>EOL recycling rate under 1%</li>
          </ol>

          <h4>Why do we include this in our score?</h4>
          <p>
            This ranking gives an indication of how materials used in electronic devices impact our natural environments.
          </p>
          <h4>Source</h4>
          <p>
            <Link href = "=>">http://www.ert.eu/sites/default/files/Raw%20Materials%20in%20the%20Industrial%20Value%20Chain%20-%20January%202013.pdf</Link>
          </p>


          <h2>Categories related to countries where materials are mined</h2>

          <h3>HUMAN RIGHTS</h3>
          <p>
            The human rights score is based on the International Human Rights Ranking Indicator. The indicator for each country is calculated by evaluating the rates of respect for 21 human rights, such as right to life, right to liberty and security, right to freedom from discrimination, right to education, freedom of religion, etc. 
          </p>

          <ul>
            <li>The values range from 0 to 100 points</li>
          </ul>

          <h4>Why do we include this in our score?</h4>
          <p>
            This ranking gives an indication of how human rights are taken into consideration in countries where materials are mined.
          </p>
          <h4>Source</h4>
          <p>
            <Link href = "=>">http://www.ihrri.com/</Link>
            <Link href = "=>">https://web.archive.org/web/20141113025409/http://ihrri.com/contry.php</Link>
          </p>


          <h3>WORKER’S RIGHTS</h3>
          <p>
            The ranking is based on the ITUC Global Right Index, which covers violations in 139 countries recorded from April 2013 – March 2014. The methodology of the index is grounded In standards of fundamental rights at work, in particular the right to freedom of association, the right to collective bargaining and the right to strike.
          </p>

          <ol>
            <li>Irregular violation of rights; collective labor rights are generally guaranteed</li>
            <li>Repeated violation of rights; certain rights have come under the repeated attack by governments and/or companies</li>
            <li>Regular violation of rights; government and/or companies are regularly interfering in collective labor rights or are failing to fully guarantee them</li>
            <li>Systematic violation of rights; the government and/or companies are engaged in serious efforts to crush the collective voice of workers</li>
            <li>No guarantee of rights; workers have effectively no access to right spelled out by the legislation and are therefore exposed to unfair labor practices (in some countries this is linked to dysfunctional institutions as a result of internal conflict and/or military occupation)
            </li>
          </ol>

          <h4>Why do we include this in our score?</h4>
          <p>
            This ranking gives an indication of workers’ rights and the living and working conditions in mines and factories.
          </p>
          <h4>Source</h4>
          <p>
            <Link href = "=>">http://www.ituc-csi.org/IMG/pdf/survey_ra_2014_eng_v2.pdf</Link>
          </p>

          <h3>POLITICAL RISK IN MINING INDUSTRY</h3>
          <p>
            This ranking concentrates on the mining industry in specific countries, considering political risk as a relevant factor. The countries are ranked based on more criteria, such as the country’s economic system, country’s political system, the degree of social issues affecting mining in the country and the degree of corruption prevalent in the country and others.
          </p>

          <ul>
            <li>The values range from 0 to 70 points</li>
          </ul>

          <h4>Why do we include this in our score?</h4>
          <p>
            This ranking not only considers the overall social conflicts in mining countries but also looks at the social issues affecting the mining industry itself.
          </p>
          <h4>Source</h4>
          <p>
            <Link href = "=>">http://www.dolbear.com/news-resources/documents</Link>
          </p>

          <h1>Data about the materials</h1>
          <p>
          <Link href = "=>">
            http://www.phonearena.com/news/Smartphone-chemistry-the-secret-materials-that-make-your-handset-tick_id60746
          </Link>
          </p>
          <p>
          <Link href = "=>">
            http://www.oeko.de/oekodoc/1375/2012-010-en.pdf
          </Link>
          </p>
          <p>
          <Link href = "=>">
            http://www.chamberofmines.org.na/fileadmin/user_upload/May_2014/5.1_Minerals_in_our_everyday_use.pdf
          </Link>
          </p>

          <Link href = "=>">https://germanwatch.org/de/download/2263.pdf</Link>

        </div>
        <Navigation />
      </div>
    )
  }
});

module.exports = Methodology;
      