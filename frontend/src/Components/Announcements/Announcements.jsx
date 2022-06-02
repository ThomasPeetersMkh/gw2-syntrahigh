import "./announcements.scss";

const Announcements = () => {
  return (
    <div className="announcements_body">
      <div className="announcements_container">
        <div className="announcements_container__text">
          <h1 className="announcements_container__text__title">
            Sportdag 25/06/2022
          </h1>
          <p className="announcements_container__text__paragraph">
            De sportdag dit jaar was opnieuw een succes. De dag begon met een
            collectieve yogasessie waardoor de leerlingen hun spieren konden
            opwarmen en daarnaast kennis maakten met mindfull breathing. De
            leerlingen gingen dit jaar op fietstocht door de Vlaamse ardennen.
            Zo fietsten we maar liefst 35km! Gelukkig werd de fietstocht
            afgesloten met een lekker ijsje, wat zeer welkom was op deze hete
            dag!
          </p>
        </div>
        <div className="announcements_container__imageholder">
          <img
            src="http://www.bikingtrips.org/wpimages/92dc8ec741e3.jpg"
            alt="children on a bicycle"
            className="announcements_container__image"
          />
        </div>
      </div>
      <div className="announcements_container">
        <div className="announcements_container__text">
          <h1 className="announcements_container__text__title">
            Opendeurdag 25/05/2022
          </h1>
          <p className="announcements_container__text__paragraph">
            In het weekend van 25 mei stelt Syntra High zijn deuren open voor
            toekomstige leerlingen en hun ouders. "We zijn in deze coronatijden
            erg gegroeid", aldus directeur Yves De Scheper. "We zijn hierdoor
            erg tevreden dat we voor het eerst in twee jaar een opendeurdag
            mogen houden zonder ristricties. Op deze manier kunnen we tonen wat
            Syntra High te bieden heeft." De leerlingen en hun ouders kunnen een
            rondleiding krijgen, daarna zijn ze steeds welkom in de eetzaal voor
            versnaperingen en een gezellige babbel.
          </p>
        </div>
        <div className="announcements_container__imageholder">
          <img
            src="https://st3.depositphotos.com/29384342/33853/i/450/depositphotos_338532124-stock-photo-summer-holidays-teenage-concept-group.jpg"
            alt="children on a bicycle"
            className="announcements_container__image"
          />
        </div>
      </div>
    </div>
  );
};

export default Announcements;
