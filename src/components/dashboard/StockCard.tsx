const StockCard = ({ stock }) => (
  <div className="stock-card">
    <div className="stock-header">
      <div className="stock-symbol">{stock.symbol}</div>
      <div className="stock-price">${stock.price}</div>
    </div>

    <div className="stock-company">{stock.name}</div>

    <div
      className={`stock-change ${stock.change >= 0 ? "positive" : "negative"}`}
    >
      {stock.change >= 0 ? "+" : ""}
      {stock.change} ({stock.percentChange}%)
    </div>

    <button className="stock-select-btn">Select Stock</button>
  </div>
);

export default StockCard;
