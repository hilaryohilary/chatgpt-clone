// Function to group data by date categories
 interface chatHistory {
    date: Date,
    chatSessions: Array<{ role: String; content: String }>,
    id: String;
    
}
const groupByDateCategory = (data: chatHistory[]): { [key: string]: chatHistory[] } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const categories: { [key: string]: string } = {
    'Today': 'Today',
    'Yesterday': 'Yesterday',
    'Last 7 Days': 'Last 7 Days',
    'Last 30 Days': 'Last 30 Days',
    'Older': 'Older',
  };

  return data.reduce((grouped:any, item) => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let category: string;
    if (diffDays === 0) {
      category = categories['Today'];
    } else if (diffDays === 1) {
      category = categories['Yesterday'];
    } else if (diffDays <= 7) {
      category = categories['Last 7 Days'];
    } else if (diffDays <= 30) {
      category = categories['Last 30 Days'];
    } else {
      category = categories['Older'];
    }

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(item);

    return grouped;
  }, {});
};
