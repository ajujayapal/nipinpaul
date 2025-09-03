// src/components/SidebarCard.jsx
import styles from './SidebarCard.module.css';

const SidebarCard = ({ title, items, renderItem, loading }) => {
  return (
    <div className={styles.sidebarBox}>
      <h3 className={styles.title}>{title}</h3>
      {loading ? (
        <ul className={styles.list}>
          {[...Array(3)].map((_, idx) => (
            <li key={idx} className={styles.listItem}></li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list}>
          {items.length > 0 ? (
            items.map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                {renderItem(item)}
              </li>
            ))
          ) : (
            <li className={styles.listItem}>No data available</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SidebarCard;
