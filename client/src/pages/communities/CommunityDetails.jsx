import React, { useEffect } from 'react';

const CommunityDetails = ({ community }) => {
  console.log('Received community:', community);

  useEffect(() => {
    // Si vous avez besoin de faire quelque chose lorsque la communauté change
    console.log('Community has been updated:', community);

    // Ajoutez ici tout code supplémentaire que vous souhaitez exécuter lorsque la communauté change

  }, [community]); // Déclenche l'effet lorsque la communauté change

  if (!community) {
    return <p>No community data available.</p>;
  }

  return (
    <div>
      <h1>{community.title}</h1>
      <p>{community.description}</p>
      {/* Display other community data here */}
    </div>
  );
};

export default CommunityDetails;



