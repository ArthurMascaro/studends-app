export function fetchData (setStudents, setWeek, setLessons, setLectures ) {

    if (setStudents) {
        window.main.send("find-all-students-with-phones-and-debt");
        window.main.receive("find-all-students-with-phones-and-debt-success", event => {
            window.main.stop("find-all-students-with-phones-and-debt-success");
            setStudents(event);
        });
    }

    if (setWeek) {
        window.main.send("find-lectures-by-week")
        window.main.receive("find-lectures-by-week-success", event => {
            window.main.stop("find-lectures-by-week-success");
            setWeek(event);
        });
    }

    if (setLessons) {
        window.main.send("find-all-lessons");
        window.main.receive("find-all-lessons-success", event => {
            window.main.stop("find-all-lessons-success");
            setLessons(event);
        })
    }

    if (setLectures) {
        window.main.send("find-all-lectures-sorted-by-date");
        window.main.receive("find-all-lectures-sorted-by-date-success", event => {
            window.main.stop("find-all-lectures-sorted-by-date-success");
            setLectures(event);
        })
    }
}

export async function sendEvent (channel, ...args) {
    return new Promise((resolve, reject) => {
        window.main.receive(`${channel}-success`, event => {
            resolve(event);
        });

        window.main.send(channel, ...args);

        const timeout = setTimeout(() => {
            reject(new Error("Timeout error"));
        }, 5000)

        window.main.receive(`${channel}-error`, event => {
            clearTimeout(timeout);
            reject(event)
        })
    })
}