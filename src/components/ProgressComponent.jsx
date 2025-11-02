import React from 'react';
const ProgressComponent = () => {
  return (
    <div id="progress" className="content-section">
      <h1>Your Progress</h1>
      <div className="progress-container">
        <div className="progress-card">
          <h3><i className="fas fa-book-open"></i> Current Courses</h3>
          <ul>
            <li>
              <div>
                <strong>Python Programming</strong>
                <div>Module 3 (In Progress)</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '65%' }}></div>
                </div>
              </div>
            </li>
            <li>
              <div>
                <strong>Web Development Basics</strong>
                <div>Module 1 (In Progress)</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '30%' }}></div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="progress-card">
          <h3><i className="fas fa-calendar-alt"></i> Upcoming Classes</h3>
          <ul>
            <li>
              <div>
                <strong>Java Programming</strong>
                <div>Starts on May 15, 2023</div>
              </div>
            </li>
            <li>
              <div>
                <strong>Database Management</strong>
                <div>Starts on June 1, 2023</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="progress-card">
          <h3><i className="fas fa-clock"></i> Today's Timings</h3>
          <ul>
            <li>
              <div>
                <strong>9:00 AM - 11:00 AM</strong>
                <div>Python Programming</div>
              </div>
            </li>
            <li>
              <div>
                <strong>2:00 PM - 4:00 PM</strong>
                <div>Web Development</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProgressComponent;
