const fs = require('fs');

const filesToUpdate = {
  'src/data.ts': [
    ['1631627993070-5fa3a47926b0', '1581092160562-40aa08e78837'],
    ['1615412798606-25f0e97d19df', '1628151015968-3a4429e9ef04'],
    ['1612086436660-6b6de624538e', '1513694203232-719a280e022f'],
    ['1622830847240-5e38d61ea151', '1583847268964-b28dc8f51f92']
  ],
  'src/components/EthosSection.tsx': [
    ['1563200780-e3db98f8227b', '1610701596007-11502861dcfa']
  ],
  'src/components/CollectionsGallery.tsx': [
    ['1582213782179-e0d53f98f2ca', '1600585154340-be6161a56a0c'],
    ['1589417855669-e0d00f735d10', '1518455027359-f3f8164ba6bd']
  ],
  'src/pages/Journal.tsx': [
    ['1622830847240-5e38d61ea151', '1581092160562-40aa08e78837'],
    ['1631558231908-1ccda57b8e61', '1509062522246-3755977927d7'],
    ['1612086436660-6b6de624538e', '1550684848-fac1c5b4e853'],
    ['1566374828114-1d0fc8787f79', '1518770660439-4636190af475'],
    ['1618005182384-a83a8bd57fbe', '1573164713988-8665fc963095']
  ],
  'src/pages/Home.tsx': [
    ['1622339589324-f77242c73330', '1631427962232-803d4f30c64f'],
    ['1631627993070-5fa3a47926b0', '1581092160562-40aa08e78837'],
    ['1615412798606-25f0e97d19df', '1628151015968-3a4429e9ef04']
  ],
  'src/pages/About.tsx': [
    ['1621532420953-27c9dce1c070', '1581092160562-40aa08e78837']
  ],
  'src/pages/Contact.tsx': [
    ['1595932598380-4d567dafb7b7', '1524661135-423995f22d0b']
  ]
};

for (const [file, replacements] of Object.entries(filesToUpdate)) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [oldId, newId] of replacements) {
      content = content.replace(new RegExp(oldId, 'g'), newId);
    }
    fs.writeFileSync(file, content);
  }
}
console.log("Images reverted.");
