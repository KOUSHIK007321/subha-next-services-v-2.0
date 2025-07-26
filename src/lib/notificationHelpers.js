// lib/notificationHelpers.js
// Helper functions for managing notifications with MongoDB

// Function to create a notification when new data is inserted
export async function createNotification(db, message, type = 'info', relatedId = null) {
  try {
    const notification = {
      message,
      type, // 'info', 'warning', 'error', 'success'
      isRead: false,
      relatedId, // ID of the related record that triggered this notification
      createdAt: new Date(),
      readAt: null
    };
    
    const result = await db.collection('notifications').insertOne(notification);
    return result.insertedId;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

// Function to get unread notification count
export async function getUnreadNotificationCount(db) {
  try {
    const count = await db.collection('notifications').countDocuments({
      isRead: false
    });
    return count;
  } catch (error) {
    console.error('Error getting notification count:', error);
    throw error;
  }
}

// Function to mark notifications as read
export async function markNotificationsAsRead(db, notificationIds = null) {
  try {
    const filter = notificationIds 
      ? { _id: { $in: notificationIds } }
      : { isRead: false };
    
    const result = await db.collection('notifications').updateMany(
      filter,
      { 
        $set: { 
          isRead: true, 
          readAt: new Date() 
        } 
      }
    );
    
    return result.modifiedCount;
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    throw error;
  }
}

// Function to get recent notifications
export async function getRecentNotifications(db, limit = 10) {
  try {
    const notifications = await db.collection('notifications')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
}

// Example: Function to trigger notification when new record is added to any table
export async function onNewRecordInserted(db, tableName, recordId, recordData) {
  try {
    const message = `New record added to ${tableName}`;
    await createNotification(db, message, 'info', recordId);
    
    // You can customize the message based on the table or record type
    // Example customizations:
    switch(tableName.toLowerCase()) {
      case 'users':
        await createNotification(db, `New user registered: ${recordData.name || recordData.email}`, 'success', recordId);
        break;
      case 'orders':
        await createNotification(db, `New order received: Order #${recordId}`, 'info', recordId);
        break;
      case 'products':
        await createNotification(db, `New product added: ${recordData.name}`, 'success', recordId);
        break;
      default:
        await createNotification(db, `New ${tableName.slice(0, -1)} added`, 'info', recordId);
    }
  } catch (error) {
    console.error('Error creating notification for new record:', error);
  }
}

// Middleware function to automatically create notifications for any insert operation
export function withNotificationMiddleware(insertFunction, tableName) {
  return async function(db, data) {
    try {
      // Execute the original insert
      const result = await insertFunction(db, data);
      
      // Create notification after successful insert
      await onNewRecordInserted(db, tableName, result.insertedId, data);
      
      return result;
    } catch (error) {
      console.error(`Error in ${tableName} insert with notification:`, error);
      throw error;
    }
  };
}