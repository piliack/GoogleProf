function debug_CalendarManagerGP_getProjectCalendar() {
  DebugGP.init();
  Logger.log(CalendarManagerGP.getProjectCalendar().getName());
}

function debug_CalendarManagerGP_insertEvent() {
  DebugGP.init();
  var starDate=new Date();
  starDate.setHours(10);
  starDate.setMinutes(0);
  var endDate=new Date(starDate.valueOf());
  endDate.setHours(endDate.getHours()+1);
  CalendarManagerGP.insertEvent('test','test test',starDate,endDate,[{title:'truc',fileUrl:'https://docs.google.com/spreadsheets/d/1WPpoMoz3QQVOaQgFPscQobUrYzLaNOKHIz9BZWZfvO4'}],11);
}

function debug_CalendarManagerGP_deleteEvent() {
  DebugGP.init();
  var starDate=new Date();
  starDate.setHours(10);
  starDate.setMinutes(0);
  var endDate=new Date(starDate.valueOf());
  endDate.setHours(endDate.getHours()+1);
  CalendarManagerGP.deleteEventsByStartDateTime(starDate,endDate);
}

var CalendarManagerGP = {
  calendar: null,
  /**
   *
   * @return {CalendarFunc}
   */
  getProjectCalendar: function () {
    if (this.calendar) {
      return this.calendar;
    }
    var projectName = mainGP.projectFolder.getName();
    var calendars = CalendarApp.getCalendarsByName(projectName);
    if (!calendars || calendars.length === 0) {
      this.calendar = CalendarApp.createCalendar(projectName);
      return this.calendar;
    }
    this.calendar = calendars[0];
    return this.calendar;
  },

  /**
   *
   * @param summary {string}
   * @param description {string}
   * @param start {Date}
   * @param end {Date}
   * @param [attachments] {Array.<CalendarEventAttachment>}
   * @param [colorId] {number}
   * @return {CalendarEventFunc}
   */

  insertEvent: function (summary, description, start, end, attachments, colorId) {
    var event = {
      summary: summary,
      description: description,
      start: {
        dateTime: start.toISOString()
      },
      end: {
        dateTime: end.toISOString()
      }
    };
    if (attachments) {
      event.attachments = attachments;
    }
    if (colorId !== undefined && colorId !== null && colorId >= 0) {
      event.colorId = colorId;
    }

    var calendar = this.getProjectCalendar();

    return Calendar.Events.insert(event, calendar.getId());
  },

  deleteEventsByStartDateTime: function (starDateTime,endDataTime) {
    var calendar = this.getProjectCalendar();
    var events = calendar.getEvents(starDateTime, endDataTime);
    for (var i = 0, l = events.length; i < l; i++) {
      events[i].deleteEvent();
    }
  }

};

/**
 *
 * @param title {string}
 * @param fileUrl {string}
 * @constructor
 */
function CalendarEventAttachment(title,fileUrl) {
  this.fileUrl = fileUrl;
  this.title = title;
}