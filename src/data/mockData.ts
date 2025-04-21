import { User, Sensor, Notification, FireStation, Educational } from '@/types/types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City',
    phone: '555-123-4567',
    hasSystem: true,
    sensorsInstalled: 3,
    systemStatus: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: '456 Oak Ave, Town',
    phone: '555-765-4321',
    hasSystem: true,
    sensorsInstalled: 2,
    systemStatus: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    address: '789 Pine St, Village',
    phone: '555-987-6543',
    hasSystem: false,
    sensorsInstalled: 0,
    systemStatus: 'inactive',
  },
];

// Mock Sensors
export const sensors: Sensor[] = [
  {
    id: 's1',
    userId: '1',
    location: 'Kitchen',
    status: 'normal',
    batteryLevel: 95,
    temperature: 24,
    smokeLevel: 2,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 's2',
    userId: '1',
    location: 'Living Room',
    status: 'normal',
    batteryLevel: 87,
    temperature: 22,
    smokeLevel: 1,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 's3',
    userId: '1',
    location: 'Bedroom',
    status: 'normal',
    batteryLevel: 90,
    temperature: 21,
    smokeLevel: 0,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 's4',
    userId: '2',
    location: 'Kitchen',
    status: 'normal',
    batteryLevel: 75,
    temperature: 25,
    smokeLevel: 3,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 's5',
    userId: '2',
    location: 'Bedroom',
    status: 'normal',
    batteryLevel: 80,
    temperature: 23,
    smokeLevel: 1,
    lastUpdated: new Date().toISOString(),
  },
];

// Mock Fire Stations
export const fireStations: FireStation[] = [
  {
    id: 'fs1',
    name: 'Central Fire Station',
    address: '100 Fire Dept Rd, City',
    phone: '555-911-0001',
    jurisdiction: 'Central District',
    staff: 24,
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 'fs2',
    name: 'North County Fire Station',
    address: '200 North Ave, County',
    phone: '555-911-0002',
    jurisdiction: 'North District',
    staff: 18,
    coordinates: { lat: 37.8044, lng: -122.2711 },
  },
  {
    id: 'fs3',
    name: 'Eastside Fire Station',
    address: '300 East St, Town',
    phone: '555-911-0003',
    jurisdiction: 'East District',
    staff: 15,
    coordinates: { lat: 37.8715, lng: -122.2730 },
  },
];

// Mock Notifications
export const userNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'info',
    title: 'System Test Completed',
    message: 'Monthly system test completed successfully.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: true,
  },
  {
    id: 'n2',
    userId: '1',
    type: 'warning',
    title: 'Smoke Detector Battery Low',
    message: 'Kitchen smoke detector battery is below 30%.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isRead: false,
  },
  {
    id: 'n3',
    userId: '2',
    type: 'alert',
    title: 'High Temperature Detected',
    message: 'Unusually high temperature detected in the kitchen.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isRead: false,
  },
];

export const stationNotifications: Notification[] = [
  {
    id: 'sn1',
    stationId: 'fs1',
    type: 'alert',
    title: 'Fire Alert',
    message: 'Fire detected at 123 Main St, City. User: John Doe.',
    userId: '1',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    isRead: false,
  },
  {
    id: 'sn2',
    stationId: 'fs1',
    type: 'warning',
    title: 'Smoke Alert',
    message: 'Smoke detected at 456 Oak Ave, Town. User: Jane Smith.',
    userId: '2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: true,
  },
  {
    id: 'sn3',
    stationId: 'fs2',
    type: 'info',
    title: 'Installation Request',
    message: 'New installation request from 789 Pine St, Village.',
    userId: '3',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isRead: false,
  },
];

// Updated Mock Educational Content
export const educationalContent: Educational[] = [
  {
    id: 'ed1',
    title: 'How Fire Spreads',
    description: 'Learn about the physics of fire spread and combustion.',
    content: `
      <p>Fire is a chemical reaction that requires three elements to exist: heat, fuel, and oxygen - also known as the fire triangle.</p>
      <p>When these three elements combine in the right mixture, a chain reaction occurs which sustains the fire.</p>
      <h3>Heat Transfer</h3>
      <p>Heat transfers in three primary ways:</p>
      <ul>
        <li><strong>Conduction:</strong> Direct transfer through solid materials</li>
        <li><strong>Convection:</strong> Transfer through liquids and gases</li>
        <li><strong>Radiation:</strong> Transfer through electromagnetic waves</li>
      </ul>
      <p>Understanding these principles helps in creating effective fire prevention systems.</p>
      <h3>Fire Stages</h3>
      <p>Fires typically progress through four stages:</p>
      <ol>
        <li><strong>Incipient:</strong> The beginning stage where smoke may not be visible</li>
        <li><strong>Growth:</strong> Active flames that spread rapidly</li>
        <li><strong>Fully Developed:</strong> The hottest and most dangerous phase</li>
        <li><strong>Decay:</strong> When fuel or oxygen is depleted</li>
      </ol>
      <p>Early detection at the incipient stage is crucial for preventing major damage and saving lives.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    videoUrl: 'https://www.youtube.com/embed/IwBiZtfjioU',
    category: 'physics',
  },
  {
    id: 'ed2',
    title: 'Smoke Detection Science',
    description: 'Discover how smoke detectors work to save lives.',
    content: `
      <p>Modern smoke detectors use two primary detection methods:</p>
      <h3>Ionization Detectors</h3>
      <p>These contain a small amount of radioactive material that ionizes the air. When smoke enters, it disrupts the ionization and triggers the alarm.</p>
      <ul>
        <li>More responsive to flaming fires</li>
        <li>Uses Americium-241 to create ions</li>
        <li>Detects invisible particles of combustion</li>
      </ul>
      <h3>Photoelectric Detectors</h3>
      <p>These use a light source aimed away from a sensor. When smoke enters, it scatters the light beam toward the sensor, triggering the alarm.</p>
      <ul>
        <li>More responsive to smoldering fires</li>
        <li>Better at detecting larger smoke particles</li>
        <li>Less prone to false alarms from steam and cooking</li>
      </ul>
      <p>Dual-sensor smoke detectors combine both technologies for optimal protection against both fast-flaming and smoldering fires.</p>
      <h3>Smart Detection Systems</h3>
      <p>Modern fire detection systems like Fire Guardian Network use a combination of technologies:</p>
      <ul>
        <li>Temperature sensors for heat detection</li>
        <li>Smoke particle analysis</li>
        <li>Carbon monoxide detection</li>
        <li>Machine learning algorithms to reduce false alarms</li>
      </ul>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    videoUrl: 'https://www.youtube.com/embed/DuAeaIcAXtg',
    category: 'technology',
  },
  {
    id: 'ed3',
    title: 'Fire Safety Planning',
    description: 'Create an effective evacuation plan for your home.',
    content: `
      <p>Every home should have a fire evacuation plan that all family members are familiar with.</p>
      <h3>Key Elements of an Evacuation Plan:</h3>
      <ul>
        <li>Identify two exits from each room</li>
        <li>Establish a meeting point outside the home</li>
        <li>Practice the evacuation plan regularly</li>
        <li>Consider special needs of family members</li>
      </ul>
      <p>When evacuating, remember to:</p>
      <ul>
        <li>Stay low to avoid smoke inhalation</li>
        <li>Feel doors for heat before opening</li>
        <li>Never go back inside a burning building</li>
      </ul>
      <h3>Creating a Home Fire Escape Plan</h3>
      <ol>
        <li><strong>Draw a floor plan</strong> of your home showing all possible exits</li>
        <li><strong>Mark two ways out</strong> of each room, including windows and doors</li>
        <li><strong>Choose an outside meeting place</strong> a safe distance from your home</li>
        <li><strong>Push the test button</strong> on your smoke alarm to start your drill</li>
        <li><strong>Practice your escape plan</strong> at least twice a year, at night and during the day</li>
      </ol>
      <p>Remember: In a real fire, once you're out, stay out. Never go back inside a burning building.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    videoUrl: 'https://www.youtube.com/embed/X9qcIZGX1ro',
    category: 'safety',
  },
  {
    id: 'ed4',
    title: 'Fire Prevention at Home',
    description: 'Simple steps to prevent fires in your home.',
    content: `
      <p>Most home fires are preventable with proper precautions and awareness.</p>
      <h3>Kitchen Safety</h3>
      <ul>
        <li>Never leave cooking unattended</li>
        <li>Keep flammable items away from the stove</li>
        <li>Don't cook when sleepy or impaired</li>
        <li>Keep a fire extinguisher in the kitchen</li>
      </ul>
      <h3>Electrical Safety</h3>
      <ul>
        <li>Don't overload outlets or extension cords</li>
        <li>Replace damaged electrical cords immediately</li>
        <li>Use appropriate wattage in light fixtures</li>
        <li>Keep electrical appliances away from water</li>
      </ul>
      <h3>Heating Equipment</h3>
      <ul>
        <li>Keep space heaters at least 3 feet from anything flammable</li>
        <li>Turn off portable heaters when leaving the room</li>
        <li>Have furnaces inspected annually</li>
        <li>Clean chimney flues regularly</li>
      </ul>
      <p>Regular maintenance of your Fire Guardian system ensures optimal performance and early detection of potential fire hazards.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b',
    videoUrl: 'https://www.youtube.com/embed/qmkdS-ZKA0Y',
    category: 'safety',
  },
  {
    id: 'ed5',
    title: 'Chemistry of Combustion',
    description: 'Understanding the science behind fire at the molecular level.',
    content: `
      <p>Combustion is a chemical reaction between fuel and oxygen that produces heat and light.</p>
      <h3>The Fire Triangle</h3>
      <p>Three elements must be present for a fire to occur:</p>
      <ul>
        <li><strong>Fuel:</strong> Any combustible material</li>
        <li><strong>Oxygen:</strong> Typically from air (which is 21% oxygen)</li>
        <li><strong>Heat:</strong> Enough energy to start and maintain the reaction</li>
      </ul>
      <h3>Combustion Process</h3>
      <p>The chemical process of combustion follows these steps:</p>
      <ol>
        <li><strong>Heating:</strong> The fuel reaches its ignition temperature</li>
        <li><strong>Decomposition:</strong> Complex molecules break down into simpler compounds</li>
        <li><strong>Oxidation:</strong> Oxygen combines with decomposed fuel molecules</li>
        <li><strong>Energy Release:</strong> Heat and light are produced</li>
      </ol>
      <h3>Types of Combustion</h3>
      <ul>
        <li><strong>Complete combustion:</strong> Occurs with plenty of oxygen, producing mainly carbon dioxide and water</li>
        <li><strong>Incomplete combustion:</strong> Occurs with limited oxygen, producing carbon monoxide and soot</li>
      </ul>
      <p>Understanding these principles helps us design more effective fire detection and suppression systems.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    videoUrl: 'https://www.youtube.com/embed/RQN6K5HqEa0',
    category: 'physics',
  },
  {
    id: 'ed6',
    title: 'Advanced Fire Detection Technologies',
    description: 'How modern systems like Fire Guardian use AI and IoT for early detection.',
    content: `
      <p>Fire Guardian Network utilizes cutting-edge technology to detect fires earlier and respond faster than conventional systems.</p>
      <h3>Multi-Sensor Approach</h3>
      <p>Our system combines multiple sensor types for comprehensive detection:</p>
      <ul>
        <li><strong>Heat sensors:</strong> Detect abnormal temperature changes</li>
        <li><strong>Smoke particle analyzers:</strong> Identify airborne combustion particles</li>
        <li><strong>Gas detectors:</strong> Monitor for carbon monoxide and other combustion gases</li>
        <li><strong>Infrared sensors:</strong> Detect heat signatures characteristic of flames</li>
      </ul>
      <h3>Artificial Intelligence</h3>
      <p>Our AI algorithms process data from all sensors to:</p>
      <ul>
        <li>Distinguish between normal cooking activity and dangerous fires</li>
        <li>Recognize patterns that precede fire development</li>
        <li>Continuously improve detection accuracy through machine learning</li>
        <li>Reduce false alarms while increasing early detection rates</li>
      </ul>
      <h3>IoT Connectivity</h3>
      <p>Internet of Things connectivity enables:</p>
      <ul>
        <li>Real-time alerts to homeowners and fire stations</li>
        <li>Remote monitoring and system control</li>
        <li>Automatic emergency responses</li>
        <li>Integration with smart home systems</li>
      </ul>
      <p>This combination of technologies helps detect fires at the earliest possible stage, often before visible flames appear.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    videoUrl: 'https://www.youtube.com/embed/8Tl0MMT9y_g',
    category: 'technology',
  }
];

// Function to generate simulated sensor data (with random fluctuations)
export function generateSensorData(sensor: Sensor): Sensor {
  // Random temperature fluctuation (-1 to +1 degree)
  const tempChange = Math.random() * 2 - 1;
  // Random smoke fluctuation (0 to 0.5)
  const smokeChange = Math.random() * 0.5;
  // Small battery decrease
  const batteryChange = Math.random() * 0.1;
  
  return {
    ...sensor,
    temperature: Math.max(20, Math.min(30, sensor.temperature + tempChange)),
    smokeLevel: Math.max(0, Math.min(10, sensor.smokeLevel + smokeChange)),
    batteryLevel: Math.max(0, Math.min(100, sensor.batteryLevel - batteryChange)),
    lastUpdated: new Date().toISOString(),
    status: determineSensorStatus(sensor.temperature + tempChange, sensor.smokeLevel + smokeChange),
  };
}

// Function to determine sensor status based on temperature and smoke levels
function determineSensorStatus(temperature: number, smokeLevel: number): 'normal' | 'warning' | 'danger' {
  if (temperature > 28 || smokeLevel > 7) {
    return 'danger';
  } else if (temperature > 26 || smokeLevel > 4) {
    return 'warning';
  } else {
    return 'normal';
  }
}

// Simulated API functions
export const API = {
  // User related functions
  sendAlert: async (userId: string, message: string): Promise<boolean> => {
    console.log(`Alert sent for user ${userId}: ${message}`);
    // In a real app, this would make an API call
    return true;
  },
  
  requestInstallation: async (userId: string, address: string): Promise<boolean> => {
    console.log(`Installation requested for ${address} by user ${userId}`);
    // In a real app, this would make an API call
    return true;
  },
  
  // Fire station related functions
  activateWaterPump: async (userId: string): Promise<boolean> => {
    console.log(`Water pump activated for user ${userId}`);
    // In a real app, this would make an API call
    return true;
  },
  
  soundAlarm: async (userId: string): Promise<boolean> => {
    console.log(`Alarm sounded for user ${userId}`);
    // In a real app, this would make an API call
    return true;
  },
  
  sendConfirmation: async (userId: string, message: string): Promise<boolean> => {
    console.log(`Confirmation sent to user ${userId}: ${message}`);
    // In a real app, this would make an API call
    return true;
  },
  
  // Notifications
  markNotificationAsRead: async (notificationId: string): Promise<boolean> => {
    console.log(`Notification ${notificationId} marked as read`);
    // In a real app, this would make an API call
    return true;
  },
  
  // Get sensor updates
  getSensorUpdates: async (): Promise<Sensor[]> => {
    // This would fetch from a real API - here we'll just simulate changes
    const updatedSensors = sensors.map(generateSensorData);
    return updatedSensors;
  },
};
