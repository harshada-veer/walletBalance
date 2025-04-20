import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://01.fy25ey02.64mb.io/';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error('API fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.greeting}>Hi, Clarence</Text>

      <View style={styles.notifCard}>
        <Text style={styles.notifTitle}>Weekly task has been completed!</Text>
        <Text style={styles.notifText}>Lorem ipsum dolor sit amet</Text>
      </View>

      <View style={styles.row}>
        <Card
          icon="💰"
          title="Wallet Balance"
          value={`$${data.balance}`}
          bgColor="#ffffff"
        />
      </View>

      <View style={styles.row}>
        <MiniCard title="Auto Fill Date" value={data.autofillDate} />
        <MiniCard title="Auto Fill Amount" value={`$${data.autofillAmount}`} />
      </View>

      <View style={styles.row}>
        <StatCard
          title="Activities this week"
          value="136 Calls"
          change="-7.6%"
          changeColor="#FF5B5B"
        />
        <StatCard
          title="Activities this month"
          value="986 Calls"
          change="+10.6%"
          changeColor="#3BC56F"
        />
      </View>

      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>76%</Text>
        <Text style={styles.taskSubtitle}>
          Overall Task Completion{'\n'}
          Achievement against total calls targeted
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent</Text>

      <View style={styles.row}>
        <InfoCard title="Lead Generation" completed={343} pending={368} />
        <InfoCard title="Product Launch" completed={488} pending={105} />
      </View>

      <Text style={styles.sectionTitle}>September Activities</Text>
      <View style={styles.chart}>
        <Text style={{ color: '#aaa' }}>[Chart Placeholder]</Text>
      </View>
    </ScrollView>
  );
}

const Card = ({ icon, title, value, bgColor }) => (
  <View style={[styles.card, { backgroundColor: bgColor }]}>
    <Text style={styles.cardIcon}>{icon}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const MiniCard = ({ title, value }) => (
  <View style={styles.miniCard}>
    <Text style={styles.miniTitle}>{title}</Text>
    <Text style={styles.miniValue}>{value}</Text>
  </View>
);

const StatCard = ({ title, value, change, changeColor }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={{ color: changeColor, fontWeight: 'bold' }}>{change}</Text>
  </View>
);

const InfoCard = ({ title, completed, pending }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoData}>{completed} Completed</Text>
    <Text style={styles.infoData}>{pending} Pending</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f2f6ff',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  notifCard: {
    backgroundColor: '#e7f9f2',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#34c88a',
  },
  notifText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  cardTitle: {
    color: '#777',
    fontSize: 13,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  miniCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
  },
  miniTitle: {
    fontSize: 13,
    color: '#777',
  },
  miniValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#2c3e50',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
  },
  statTitle: {
    fontSize: 13,
    color: '#999',
  },
  statValue: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#2c3e50',
  },
  taskCard: {
    backgroundColor: '#6C63FF',
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
  },
  taskTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  taskSubtitle: {
    color: '#e0e0ff',
    fontSize: 13,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    marginTop: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
    marginBottom: 6,
  },
  infoData: {
    fontSize: 13,
    color: '#777',
  },
  chart: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
