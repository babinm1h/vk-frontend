import moment from 'moment'
import "moment/locale/ru"


export const getCreationDate = (time: string) => {
    moment.locale('ru')
    return moment(time).startOf('second').fromNow()
}


export const formatDate = (time: string) => {
    moment.locale('ru')
    return moment(time).format('MM.DD.YYYY')
}


export const getMessageDate = (date: number) => {
    moment.updateLocale('en', {
        relativeTime: {
            s: 'right now',
            dd: `${moment(date).format('D MMM HH:mm')}`,
            d: `yesterday ${moment(date).format('HH:mm')}`,
            hh: `today ${moment(date).format('HH:mm')}`,
            w: `${moment(date).format('D MMM HH:mm')}`,
            ww: `${moment(date).format('D MMM HH:mm')}`,
            M: `${moment(date).format('D MMM HH:mm')}`,
            MM: `${moment(date).format('D MMM HH:mm')}`,
            y: `${moment(date).format('D MMM\'YY HH:mm')}`,
            yy: `${moment(date).format('D MMM\'YY HH:mm')}`
        }
    })
    return moment(date).fromNow(true)
}