function RankIcon({ rank, selectedRank, setSelectedRank }) {
  const isSelected = selectedRank === rank.name;
  const selectedImgStyle = {
    width: isSelected ? "100%" : "80%",
  };

  return (
    <div>
      <label htmlFor={rank.name}>
        <input
          type="radio"
          name="rank"
          value={rank.name}
          id={rank.name}
          onChange={() => {
            setSelectedRank(rank);
          }}
          checked={isSelected}
        />
        <img src={rank.src} alt={rank.name} style={selectedImgStyle} />
      </label>
    </div>
  );
}

export default RankIcon;
